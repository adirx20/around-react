import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';

// =====>
function Card(props) {
    // STYLE
    const imageStyle = {
        backgroundImage: `url(${props.card.link})`,
    };

    // STATE VARIABLES

    // FUNCTIONS
    function isLiked() {
        return props.card.likes.some((person) => person._id === props.card._id);
    }

    function getDeleteCardId() {
        props.onDeleteCardClick(props.card._id);
        console.log('props.card', props.card._id);
    }

    function getLikeId() {
        props.onLikeClick(props.card._id);
        console.log('likelikeprops', props.card._id);
    }

    function likeToggle() {
        if (isLiked()) {
            props.onUnlikeCard(props.card._id);
            console.log('unliked');
        } else {
            props.onlikeCard(props.card._id);
            console.log('liked'); // <================================================================================================= PROBLEM HERE! 
        }
    }


    // // USE EFFECT
    // React.useEffect(() => {
    //     console.log('isLiked', isLiked());
    // })

    return (
        <>

            <article className='element' key={props.card._id}>
                <div className='element__image' style={imageStyle}></div>
                <button className='element__delete-button button-effect' aria-label='delete' onClick={getDeleteCardId}></button>
                <div className='element__bar'>
                    <h2 className='element__title'>{props.card.name}</h2>
                    <div className='element__likes-container'>
                        <button className={`element__like-button ${isLiked() ? 'element__like-button_active' : ''}`} type='button' aria-label='like' onMouseEnter={getLikeId} onClick={likeToggle}></button>
                        <span className='element__likes-count'></span>
                    </div>
                </div>
            </article>

        </>
    );
}
// <=====

export default Card;