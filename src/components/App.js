import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import logo from '../images/header-logo.svg';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';

// =====>
function App() {
  // STATE VARIABLES
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

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
    document.querySelector('.popup_type_image').classList.add('popup_opened');
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
  }

  // JSX
  return (
    <>

      <div className='page'>

        <Header logo={logo} />

        <Main onEditProfileClick={handleEditProfileClick} onAddCardClick={handleAddCardClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick} />

        <Footer />

        <PopupWithForm name='edit-profile' title='Edit profile' saveButtonTitle='Save' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id='name-input' className='form__input form__input_type_name' type='text' name='name' placeholder='Name'
            value='' required minLength='2' maxLength='40' />
          <span id='name-input-error' className='form__input-error-message'></span>
          <input id='proffession-input' className='form__input form__input_type_profession' type='text' name='profession'
            placeholder='About me' value='' required minLength='2' maxLength='200' />
          <span id='proffession-input-error' className='form__input-error-message'></span>
        </PopupWithForm>

        <PopupWithForm name='edit-avatar' title='Change profile picture' saveButtonTitle='Save' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input id='avatar-link-input' className='form__input form__input_type_avatar-link' type='url' name='avatar-link'
            placeholder='Image URL' value='' required />
          <span id='avatar-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>

        <PopupWithForm name='add-card' title='New Place' saveButtonTitle='Save' isOpen={isAddCardPopupOpen} onClose={closeAllPopups}>
          <input id='card-input' className='form__input form__input_type_card-title' type='text' name='card-title'
            placeholder='Title' value='' required minLength='1' maxLength='30' />
          <span id='card-input-error' className='form__input-error-message'></span>
          <input id='card-link-input' className='form__input form__input_type_card-link' type='url' name='card-link'
            placeholder='Image URL' value='' required />
          <span id='card-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>

        <PopupWithForm name='delete-card' title='Are you sure?' saveButtonTitle='Yes' onClose={closeAllPopups} />

        <ImagePopup />

      </div>

    </>

  );
}
// <=====

export default App;
