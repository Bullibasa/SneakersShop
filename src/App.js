import { useState, useEffect } from "react"
import Header from "./components/Header"
import Card from "./components/Card/Card"
import Drawer from "./components/Drawer"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    fetch("https://638e2dc04190defdb758b60d.mockapi.io/items")
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setItems(json)
      })
  }, [])

  const onAddToCart = (obj) => {
    // setCartItems([...cartItems, obj])
    setCartItems((prev) => [...prev, obj])
  }

  return (
    <div className="wrapper clear">
      {cartOpen && (
        <Drawer items={cartItems} onClose={() => setCartOpen(false)} />
      )}
      <Header onClickCart={() => setCartOpen(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиcк..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onClickFavorite={() => console.log("Добавили в избранное")}
              onClickPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
