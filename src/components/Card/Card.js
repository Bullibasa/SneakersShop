import { useState } from "react"
import styles from "./Card.module.scss"

function Card({ title, price, imageUrl, onClickFavorite, onClickPlus }) {
  const [isAdd, setIsAdd] = useState(false)

  const addToBasket = () => {
    onClickPlus()
    setIsAdd(!isAdd)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/unliked.svg" alt="Unliked" onClick={onClickFavorite} />
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
