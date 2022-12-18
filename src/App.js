import { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Card from "./components/Card/Card"
import Drawer from "./components/Drawer"

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
  }, [])

  const onReamoveItem = (id) => {
    axios.delete(`https://638e2dc04190defdb758b60d.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToCart = (obj) => {
    axios.post("https://638e2dc04190defdb758b60d.mockapi.io/cart", obj)
    setCartItems((prev) => [...prev, obj])
  }

  const onAddToFavorite = (obj) => {
    axios.post("https://638e2dc04190defdb758b60d.mockapi.io/favorites", obj)
    setFavorites((prev) => [...prev, obj])
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

      {/* <Route path="/favorites"></Route> */}

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиcк..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickFavorite={(obj) => onAddToFavorite(obj)}
                onClickPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default App
