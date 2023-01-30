import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import { useContext } from "react";
import { NameContext } from "../../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom";

function Header({ logOut, loggedIn }) {
  const loginUser = useContext(NameContext);
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Switch>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__subtitle">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__subtitle">
          Войти
        </Link>
      </Route>

      <Route exact path="/">
        <div className="header__block">
          <p className="header__subtitle">{loggedIn ?  loginUser.email : ''}</p>
          <Link
            to="/sign-in"
            onClick={logOut}
            className="header__subtitle header__subtitle_exit"
          >
            Выйти
          </Link>
        </div>
      </Route>
      </Switch>
    </header>
  );
}

export default Header;
