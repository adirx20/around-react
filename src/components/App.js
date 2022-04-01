import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import logo from '../images/header-logo.svg';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Card from './Card';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// =====>
function App() {
  // POPUPS' STATE VARIABLES
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // USER DATA STATE VARIABLES
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();

  // CARDS STATE VARIABLES
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState('');


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(cardsData);
        console.log('cards', cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


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

  function handleDeleteCardClick(id) {
    console.log('id', id);
    setSelectedCard(id);
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
  }

  function handleLikeButtonClick(id) {
    console.log('likeId', id);
    setSelectedCard(id);
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

  function editAvatar() {
    const avatarLink = document.querySelector('.form__input_type_avatar-link').value;

    api.editAvatar(avatarLink)
      .then((data) => {
        setUserAvatar(data.avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  function editProfile() {
    const name = document.querySelector('.form__input_type_name').value;
    const about = document.querySelector('.form__input_type_profession').value;

    api.editProfile({ name, about })
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  function createCard() {
    const cardTitle = document.querySelector('.form__input_type_card-title').value;
    const cardLink = document.querySelector('.form__input_type_card-link').value;

    api.createCard({ name: cardTitle, link: cardLink })
      .then((data) => {
        console.log(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  function deleteCard() {
    api.deleteCard(selectedCard)
      .then((data) => {
        console.log('data deleted', data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  // function likeCard() {
  //   api.likeCard(selectedCard)
  //     .then((data) => {
  //       console.log('card liked', data);
  //     })
  //     .catch((err) => {
  //       console.log('error', err);
  //     })
  // }

  // function unlikeCard() {
  //   api.unlikeCard(selectedCard)
  //     .then((data) => {
  //       console.log('card unliked', data);
  //     })
  //     .catch((err) => {
  //       console.log('error', err);
  //     })
  // }

  // EVENT LISTENERS


  // JSX
  return (
    <>

      <div className='page'>

        <Header logo={logo} />

        <Main onEditProfileClick={handleEditProfileClick} onAddCardClick={handleAddCardClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick}
          userName={userName} userDescription={userDescription} userAvatar={userAvatar} cardsElement={cards} deleteCardButton={handleDeleteCardClick} likeButton={handleLikeButtonClick} />

        <Footer />

        <PopupWithForm name='edit-profile' title='Edit profile' saveButtonTitle='Save' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} handleSubmit={editProfile}>
          <input id='name-input' className='form__input form__input_type_name' type='text' name='name' placeholder='Name'
            defaultValue='' required minLength='2' maxLength='40' />
          <span id='name-input-error' className='form__input-error-message'></span>
          <input id='proffession-input' className='form__input form__input_type_profession' type='text' name='profession'
            placeholder='About me' defaultValue='' required minLength='2' maxLength='200' />
          <span id='proffession-input-error' className='form__input-error-message'></span>
        </PopupWithForm>

        <PopupWithForm name='edit-avatar' title='Change profile picture' saveButtonTitle='Save' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} handleSubmit={editAvatar}>
          <input id='avatar-link-input' className='form__input form__input_type_avatar-link' type='url' name='avatar-link'
            placeholder='Image URL' defaultValue='' required onChange={handleInput} />
          <span id='avatar-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>

        <PopupWithForm name='add-card' title='New Place' saveButtonTitle='Save' isOpen={isAddCardPopupOpen} onClose={closeAllPopups} handleSubmit={createCard}>
          <input id='card-input' className='form__input form__input_type_card-title' type='text' name='card-title'
            placeholder='Title' defaultValue='' required minLength='1' maxLength='30' />
          <span id='card-input-error' className='form__input-error-message'></span>
          <input id='card-link-input' className='form__input form__input_type_card-link' type='url' name='card-link'
            placeholder='Image URL' defaultValue='' required />
          <span id='card-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>

        <PopupWithForm name='delete-card' title='Are you sure?' saveButtonTitle='Yes' isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} handleSubmit={deleteCard} />

        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} />

      </div>

    </>

  );
}
// <=====

export default App;
