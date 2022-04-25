import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

// =====>
function EditProfilePopup(props) {
    return (
        <PopupWithForm name='edit-profile' title='Edit profile' saveButtonTitle='Save'
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        >
            <input id='name-input' className='form__input form__input_type_name' type='text' name='name' placeholder='Name'
                defaultValue='' required minLength='2' maxLength='40' />
            <span id='name-input-error' className='form__input-error-message'></span>
            <input id='proffession-input' className='form__input form__input_type_profession' type='text' name='profession'
                placeholder='About me' defaultValue='' required minLength='2' maxLength='200' />
            <span id='proffession-input-error' className='form__input-error-message'></span>
        </PopupWithForm>
    );
}
// <=====

export default EditProfilePopup;