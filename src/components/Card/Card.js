import { useContext, useState } from "react"
import { AppContext } from "../../App"
import ContentLoader from "react-content-loader"
import styles from "./Card.module.scss"

function Card({
  id,
  title,
  price,
  imageUrl,
  onClickPlus,
  onClickFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited)
  const obj = { id, parentId: id, title, price, imageUrl }

  const addToBasket = () => {
    onClickPlus(obj)
  }

  const onClickToFavorite = () => {
    onClickFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {onClickFavorite && (
              <img
                onClick={onClickToFavorite}
                src={
                  isFavorite
                    ? "../SneakersShop/img/liked.svg"
                    : "../SneakersShop/img/unliked.svg"
                }
                alt="Unliked"
              />
            )}
          </div>
          <img width="90%" height={130} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price}</b>
            </div>
            {onClickPlus && (
              <img
                className="button"
                onClick={addToBasket}
                src={
                  isItemAdded(id)
                    ? "../SneakersShop/img/btn-checked.svg"
                    : "../SneakersShop/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
