import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function Card({ card, cardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const elementDeleteButtonClassName = `element__button-delete ${
    isOwn ? "element__delete-button_visible" : "element__delete-button_hidden"
  }`;
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : null
  }`;
  return (
    <li className="element">
      <button
        type="button"
        className={elementDeleteButtonClassName}
        onClick={() => {
          onCardDelete(card);
        }}
      ></button>
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={() => {
          cardClick(card);
        }}
      />
      <figure className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Понравилось"
            onClick={() => {
              onCardLike(card);
            }}
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </figure>
    </li>
  );
}

export default Card;
