import { useState, useEffect, createContext } from "react"
import { Route, Routes } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Drawer from "./components/Drawer"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

export const AppContext = createContext({})

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://638e2dc04190defdb758b60d.mockapi.io/cart"
      )
      const favoritesResponse = await axios.get(
        "https://638e2dc04190defdb758b60d.mockapi.io/favorites"
      )
      const itemsResponse = await axios.get(
        "https://638e2dc04190defdb758b60d.mockapi.io/items"
      )

      setIsLoading(false)
      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onReamoveItem = (id) => {
    axios.delete(`https://638e2dc04190defdb758b60d.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToCart = (obj) => {
    try {
      axios.delete(`https://638e2dc04190defdb758b60d.mockapi.io/cart/${obj.id}`)
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        axios.post("https://638e2dc04190defdb758b60d.mockapi.io/cart", obj)
        setCartItems((prev) => [...prev, obj])
      }
    } catch (error) {
      alert("Не удалось добавить в корзину")
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://638e2dc04190defdb758b60d.mockapi.io/favorites/${obj.id}`
        )
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        const { data } = await axios.post(
          "https://638e2dc04190defdb758b60d.mockapi.io/favorites",
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert("Не удалось добавить в закладки")
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <AppContext.Provider
      value={{ items, cartItems, favorites, setCartOpen, setCartItems }}
    >
      <div className="wrapper clear">
        {cartOpen && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onRemove={onReamoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpen(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/favorites"
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
