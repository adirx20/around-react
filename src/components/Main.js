import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import Card from '../components/Card';

// =====>
function Main(props) {
    const cards = props.cardsElement;

    return (
        <>

            <main className='content'>

                <section className='profile'>
                    <div className='profile__avatar-container'>
                        <img className='profile__avatar' src='#' alt='' style={{ backgroundImage: `url(${props.userAvatar})` }} />
                        <div className='profile__avatar-overlay'></div>
                        <button className='profile__avatar-button button-effect' type='button' aria-label='edit' onClick={props.onEditAvatarClick}></button>
                    </div>
                    <div className='profile__info-container'>
                        <h1 className='profile__name'>{props.userName}</h1>
                        <button className='profile__edit-button button-effect' type='button' aria-label='edit' onClick={props.onEditProfileClick}></button>
                        <p className='profile__profession'>{props.userDescription}</p>
                    </div>
                    <button className='profile__add-button button-effect' type='button' aria-label='add' onClick={props.onAddCardClick}></button>
                </section>

                <section className='elements'>
                    {
                        cards.map((element) => (
                            <Card card={element} key={element._id} onDeleteCardClick={props.deleteCardButton} />
                        ))
                    }
                </section>

            </main>

        </>
    );
}
// <=====

export default Main;