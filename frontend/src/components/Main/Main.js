import { useState, useEffect } from "react";
import React from "react";
import api from "../../utils/Api";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  isOpenAvatarClick,
  isOpenProfileClick,
  isOpenPlaceClick,
  isOpenImageClick,
  cards,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__columns">
          <div className="profile__block" onClick={isOpenAvatarClick}>
            <div className="profile__wrapper"></div>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватарка"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-column">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__button-edit"
                onClick={isOpenProfileClick}
              ></button>
            </div>
            <p className="profile__text">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={isOpenPlaceClick}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              cardClick={isOpenImageClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
