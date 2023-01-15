import { useContext } from "react"
import Card from "../components/Card/Card"
import { AppContext } from "../App"

function Favorites({ onAddToFavorite }) {
  const { cartItems, favorites } = useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-beetwen mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onClickFavorite={onAddToFavorite}
            added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
