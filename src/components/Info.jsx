import { useContext } from "react"
import { AppContext } from "../App"

const Info = ({ title, image, description }) => {
  const { setCartOpen } = useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120} src={image} alt="EmptyCart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpen(false)} className="greenButton">
        <img src="../SneakersShop/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
