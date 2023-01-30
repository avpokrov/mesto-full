import InfoTooltipTrue from "../../images/InfoTooltipTrue.svg";
import InfoTooltipFalse from "../../images/InfoTooltipFalse.svg";

function InfoTooltip({ check, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <div className="popup__block">
          <button
            type="button"
            className="popup__close popup__close"
            onClick={onClose}
          ></button>
          <img className="popup__image" src={check ? InfoTooltipTrue : InfoTooltipFalse} alt="" />
          <h2 className="popup__name">{check ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;