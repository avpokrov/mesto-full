import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { useState, useEffect } from "react";
import apiAuth from "../../utils/ApiAuth";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [successCheck, setSuccessCheck] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function handleChangEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    apiAuth
      .signup({ email, password })
      .then((data) => {
        setIsRegister(true);
        setSuccessCheck(true)
      })
      .catch((err) => {
        setIsRegister(true);
        setSuccessCheck(false)
      });
  };

  const handleClose = () => {
    setIsRegister(false);
    if(successCheck){
      history.push("/sign-in");
    };
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form action="" className="login__form" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Email"
          className="login__input"
          onChange={handleChangEmail}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="login__input"
          onChange={handleChangePassword}
        />
        <button className="login__btn">Зарегистрироваться</button>
      </form>
      <div className="login__block">
        <p className="login__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__text">
          Войти
        </Link>
      </div>
      <InfoTooltip
        onClose={handleClose}
        isOpen={isRegister}
        check={successCheck}
      />
    </div>
  );
}

export default withRouter(Register);
