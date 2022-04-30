import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import logo from '../images/header-logo.svg';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Card from './Card';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// =====>
function App() {
  // USER STATE VARIABLES
  const [currentUser, setCurrentUser] = React.useState({});

  // POPUPS' STATE VARIABLES
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // SELECTED IMAGE STATE VARIABLE
  const [selectedImage, setSelectedImage] = React.useState({});

  // CARDS STATE VARIABLES
  const [cards, setCards] = React.useState([]);
  // const [selectedCard, setSelectedCard] = React.useState(null);


  // FUNCTIONS
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(!isAddCardPopupOpen);
  }

  function handleCardClick() {
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleImageClick(element) {
    setSelectedImage(element);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }


  function handleInput(evt) {
    return evt.target.value;
  }

  function deleteCard() {
    api.deleteCard()
      .then((data) => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  function handleUpdateUser(userData) {
    api.editProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // HANDLE CARD LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      });
  }

  // HANDLE CARD DELETE
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    isOwn && api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter((currentCard) => currentCard._id === card._id))) // NEED TO CHECH IF IT WORKS AFTER!
      .catch((err) => console.log(err))
  }

  // MOUNTING
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        // USER
        setCurrentUser(userData);
        // CARDS
        setCards(cardsData);
      })
      .catch((err) => console.log(err))
  }, [])

  // React.useEffect(() => {
  //     Promise.all([api.getInitialCards()])
  //         .then(([cardsData]) => {
  //             // USER
  //             console.log('ahasdasdasdasda', currentUser);
  //             // CARDS
  //             setCards(cardsData);
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         })
  // }, [])

  // JSX
  return (

    <div className='page'>

      <CurrentUserContext.Provider value={currentUser}>

        <Header logo={logo} />

        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddCardClick={handleAddCardClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          deleteCardButton={handleDeleteCardClick}
          onImageClick={handleImageClick}
          onClose={closeAllPopups}
          isImagePopupOpen={isImagePopupOpen}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
        />

        {/* <PopupWithForm name='edit-profile' title='Edit profile' saveButtonTitle='Save'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input id='name-input' className='form__input form__input_type_name' type='text' name='name' placeholder='Name'
            defaultValue='' required minLength='2' maxLength='40' />
          <span id='name-input-error' className='form__input-error-message'></span>
          <input id='proffession-input' className='form__input form__input_type_profession' type='text' name='profession'
            placeholder='About me' defaultValue='' required minLength='2' maxLength='200' />
          <span id='proffession-input-error' className='form__input-error-message'></span>
        </PopupWithForm> */}

        {/* <PopupWithForm name='edit-avatar' title='Change profile picture' saveButtonTitle='Save'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input id='avatar-link-input' className='form__input form__input_type_avatar-link' type='url' name='avatar-link'
            placeholder='Image URL' defaultValue='' required onChange={handleInput} />
          <span id='avatar-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm> */}

        {/* <PopupWithForm name='add-card' title='New Place' saveButtonTitle='Save'
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
        >
          <input id='card-input' className='form__input form__input_type_card-title' type='text' name='card-title'
            placeholder='Title' defaultValue='' required minLength='1' maxLength='30' />
          <span id='card-input-error' className='form__input-error-message'></span>
          <input id='card-link-input' className='form__input form__input_type_card-link' type='url' name='card-link'
            placeholder='Image URL' defaultValue='' required />
          <span id='card-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm> */}

        <PopupWithForm name='delete-card' title='Are you sure?' saveButtonTitle='Yes'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          handleSubmit={deleteCard} />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          imageLink={selectedImage.link}
          imageCaption={selectedImage.name}
        />

      </CurrentUserContext.Provider>

    </div>

  );
}
// <=====

export default App;
