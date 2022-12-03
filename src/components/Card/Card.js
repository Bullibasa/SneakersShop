import { useState } from "react"
import styles from "./Card.module.scss"

function Card(props) {
  const [isAdd, setIsAdd] = useState(false)

  const addToBasket = () => {
    setIsAdd(!isAdd)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src="/img/unliked.svg"
          alt="Unliked"
          onClick={props.onClickFavorite}
        />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price}</b>
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
