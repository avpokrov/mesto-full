import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import { useEffect, useState } from "react";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";

function Logged(loggedIn) {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setCardClick] = useState({});
  const [cards, setCards] = useState([]);

  const handleCurrentUser = () => {
    if(loggedIn){
      api
      .getUserInfo()
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    }
  };

  const onUpdateUser = (name, description) => {
    api
      .setUserInfo(name, description)
      .then((data) => {
        setCurrentUser(data);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const onUpdateAvatar = (link) => {
    api
      .setUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const handleEditProfileClick = () => {
    setEditProfileOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setCardClick(card);
  };

  const handleClose = () => {
    setEditProfileOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardClick({});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .likeCard(!isLiked, card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((i) => (i._id === card._id ? newCard : i))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api
        .removeCard(card._id)
        .then((data) => {
          setCards(cards.filter((item) => item._id !== card._id));
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if(loggedIn){
      api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
    }
  }, []);

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        handleClose();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="App">
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <Main
            isOpenProfileClick={handleEditProfileClick}
            isOpenAvatarClick={handleEditAvatarClick}
            isOpenPlaceClick={handleAddPlaceClick}
            isOpenImageClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClose}
            onUpdateUser={onUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleClose}
            newCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClose}
            onUpdateAvatar={onUpdateAvatar}
          />
          <PopupWithForm name="remove" title="Вы уверены?"></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={handleClose} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default Logged;
