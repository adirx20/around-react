import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';

// =====>
function Main(props) {
    // STATE VARIABLES
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    return (
        <>

            <main className='content'>

                <section className='profile'>
                    <div className='profile__avatar-container'>
                        <img className='profile__avatar' src='#' alt='' style={{ backgroundImage: `url(${userAvatar})` }} />
                        <div className='profile__avatar-overlay'></div>
                        <button className='profile__avatar-button button-effect' type='button' aria-label='edit' onClick={props.onEditAvatarClick}></button>
                    </div>
                    <div className='profile__info-container'>
                        <h1 className='profile__name'>{userName}</h1>
                        <button className='profile__edit-button button-effect' type='button' aria-label='edit' onClick={props.onEditProfileClick}></button>
                        <p className='profile__profession'>{userDescription}</p>
                    </div>
                    <button className='profile__add-button button-effect' type='button' aria-label='add' onClick={props.onAddCardClick}></button>
                </section>

                <section className='elements'>
                </section>

            </main>

        </>
    );
}
// <=====

export default Main;