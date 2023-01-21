import { useState, useEffect, createContext } from "react"
import { Route, Routes } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Drawer from "./components/Drawer/Drawer"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"

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
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://638e2dc04190defdb758b60d.mockapi.io/cart"),
            axios.get("https://638e2dc04190defdb758b60d.mockapi.io/favorites"),
            axios.get("https://638e2dc04190defdb758b60d.mockapi.io/items"),
          ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert("Ошибка при запросе данных")
      }
    }
    fetchData()
  }, [])

  const onReamoveItem = (id) => {
    try {
      axios.delete(`https://638e2dc04190defdb758b60d.mockapi.io/cart/${id}`)
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      )
    } catch (error) {
      alert("Ошибка при удалении товара из корзины")
    }
  }

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      )
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://638e2dc04190defdb758b60d.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(
          "https://638e2dc04190defdb758b60d.mockapi.io/cart",
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        setCartOpen,
        setCartItems,
        onAddToCart,
        onAddToFavorite,
        isItemAdded,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={onReamoveItem}
          opened={cartOpen}
        />
        <Header onClickCart={() => setCartOpen(true)} />

        <Routes>
          <Route
            exact
            path="SneakersShop"
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
            exact
            path="favorites"
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />

          <Route
            exact
            path="orders"
            element={<Orders onAddToFavorite={onAddToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
