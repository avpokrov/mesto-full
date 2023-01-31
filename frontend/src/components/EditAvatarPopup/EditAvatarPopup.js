import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Обновить"
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          ref={inputRef}
          className="popup__input popup__input_type_link"
          required
          id="link"
          type="url"
          minLength="2"
          name="link"
          placeholder="Ссылка на аватар"
        />
        <span className="popup__error-messege error-link"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
