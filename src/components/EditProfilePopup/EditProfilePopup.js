import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <div className="popup__input-container">
        <input
          id="name"
          name="profile-name"
          required
          minLength="2"
          maxLength="40"
          type="text"
          className="popup__input popup__input_type_name"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__error-messege error-name"></span>
      </div>
      <div className="popup__input-container">
        <input
          id="job"
          name="profile-job"
          required
          minLength="2"
          maxLength="200"
          type="text"
          className="popup__input popup__input_type_job"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__error-messege error-job"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
