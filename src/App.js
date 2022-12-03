import Header from "./components/Header"
import Card from "./components/Card/Card"
import Drawer from "./components/Drawer"

const arr = [
  {
    title: "Мужские кроссовки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "/img/sneakers/1.jpg",
  },
  {
    title: "Мужские кроссовки Nike Blazer Mid Suede",
    price: 15999,
    imageUrl: "/img/sneakers/2.jpg",
  },
  {
    title: "Мужские кроссовки Nike Blazer Mid Suede",
    price: 8999,
    imageUrl: "/img/sneakers/3.jpg",
  },
  {
    title: "Мужские кроссовки Nike Blazer Mid Suede",
    price: 10999,
    imageUrl: "/img/sneakers/4.jpg",
  },
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиcк..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClickFavorite={() => console.log("Добавили в избранное")}
              onClickPlus={() => console.log("Добавили в корзину")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
