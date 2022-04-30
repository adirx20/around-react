import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from '../components/PopupWithForm';

// =====>
function AddCardPopup(props) {
    // JSX
    return (
        <PopupWithForm name='add-card' title='New Place' saveButtonTitle='Save'
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input id='card-input' className='form__input form__input_type_card-title' type='text' name='card-title'
                placeholder='Title' defaultValue='' required minLength='1' maxLength='30' />
            <span id='card-input-error' className='form__input-error-message'></span>
            <input id='card-link-input' className='form__input form__input_type_card-link' type='url' name='card-link'
                placeholder='Image URL' defaultValue='' required />
            <span id='card-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>
    );
}
// <=====

export default AddCardPopup;