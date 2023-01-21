import { useContext } from "react"
import { AppContext } from "../App"
import { Link } from "react-router-dom"

function Header(props) {
  const { cartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <header className="header d-flex justify-between align-center p-40">
      <Link to="SneakersShop">
        <div className="d-flex align-center">
          <img
            width={40}
            height={40}
            alt="Логотип"
            src="../SneakersShop/img/logo.png"
          />
          <div>
            <h3 className="text-uppercase">React sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img
            width={18}
            height={18}
            alt="Корзина"
            src="../SneakersShop/img/cart.svg"
          />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-10 cu-p">
          <Link to="favorites">
            <img
              width={18}
              height={18}
              alt="Закладки"
              src="../SneakersShop/img/heart.svg"
            />
          </Link>
        </li>
        <li>
          <Link to="orders">
            <img
              width={18}
              height={18}
              alt="Пользователь"
              src="../SneakersShop/img/user.svg"
            />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
