function Header(props) {
  return (
    <header className="header d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} alt="Logo" src="/img/logo.png" />
        <div>
          <h3 className="text-uppercase">React sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} alt="Cart" src="/img/cart.svg" />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} alt="Heart" src="/img/heart.svg" />
          <img width={18} height={18} alt="User" src="/img/user.svg" />{" "}
        </li>
      </ul>
    </header>
  )
}

export default Header
