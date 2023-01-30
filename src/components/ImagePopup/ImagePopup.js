function ImagePopup({ card, onClose }) {
    return (
      <div className={`popup popup-element ${card._id ? "popup_opened" : ""}`}>
        <div className="popup-element__content">
          <button
            type="button"
            className="popup-element__close popup__close"
            onClick={onClose}
          ></button>
          <img
            className="popup-element__img"
            src={card.link}
            alt={card.name}
          />
          <h2 className="popup-element__title">{card.name}</h2>
        </div>
      </div>
    );
  }
  
  export default ImagePopup;