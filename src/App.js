import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Drawer from "./components/Drawer"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    axios
      .get("https://638e2dc04190defdb758b60d.mockapi.io/items")
      .then((res) => {
        setItems(res.data)
      })
    axios
      .get("https://638e2dc04190defdb758b60d.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data)
      })
    axios
      .get("https://638e2dc04190defdb758b60d.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data)
      })
  }, [])

  const onReamoveItem = (id) => {
    axios.delete(`https://638e2dc04190defdb758b60d.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToCart = (obj) => {
    axios.post("https://638e2dc04190defdb758b60d.mockapi.io/cart", obj)
    setCartItems((prev) => [...prev, obj])
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
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
