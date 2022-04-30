import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from '../components/PopupWithForm';

// =====>
function EditAvatarPopup(props) {
    // CURRENT USER CONTEXT
    const currentUser = React.useContext(CurrentUserContext);

    const avatarRef = React.useRef();

    function onAvatarUpdate(avatar) {
        console.log('ref', avatarRef.current.value)

        api.editAvatar(avatar)
        .then((res) => {
            console.log('Avatar updated', res.avatar);
        })
        .catch((err) => console.log(err))
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAvatarUpdate(avatarRef.current.value);
    }

    // JSX
    return (
        <PopupWithForm name='edit-avatar' title='Change profile picture' saveButtonTitle='Save'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input ref={avatarRef} id='avatar-link-input' className='form__input form__input_type_avatar-link' type='url' name='avatar-link'
                placeholder='Image URL' defaultValue='' required />
            <span id='avatar-link-input-error' className='form__input-error-message'></span>
        </PopupWithForm>
    );
}
// <=====

export default EditAvatarPopup;