import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, newCard }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handlesubmit(e) {
    e.preventDefault();
    newCard({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handlesubmit}
    >
      <div className="popup__input-container">
        <input
          ref={nameRef}
          id="newname"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          type="text"
          className="popup__input popup__input_type_name"
        />
        <span className="popup__error-messege error-newname"></span>
      </div>
      <div className="popup__input-container">
        <input
          ref={linkRef}
          id="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          type="url"
          className="popup__input popup__input_type_link"
        />
        <span className="popup__error-messege error-url"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
