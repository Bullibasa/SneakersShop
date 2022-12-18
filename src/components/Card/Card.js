import { useState } from "react"
import styles from "./Card.module.scss"

function Card({ title, price, imageUrl, onClickPlus, onClickFavorite }) {
  const [isAdd, setIsAdd] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const addToBasket = () => {
    window.location.reload()
    onClickPlus({ title, price, imageUrl })
    setIsAdd(!isAdd)
  }

  const onClickToFavorite = () => {
    onClickFavorite({ title, price, imageUrl })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
          onClick={onClickToFavorite}
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          className="button"
          onClick={addToBasket}
          src={isAdd ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default Card
