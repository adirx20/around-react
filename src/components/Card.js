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
        console.log('array', props.card.likes)

        return props.card.likes.some((like) => {
            console.log('props', props);
            console.log('person', like._id);
            return like._id === props.card._id;
        });
    }

    function getDeleteCardId() {
        props.onDeleteCardClick(props.card._id);
        console.log('props.card', props.card._id);
    }

    function getLikeId() {
        props.onLikeClick(props.card._id);
        console.log('likelikeprops', props.card._id);
    }

    function likeCard() {
        api.likeCard(props.card._id)
          .then((data) => {
            console.log('card liked', data);
          })
          .catch((err) => {
            console.log('error', err);
          })
      }
    
      function unlikeCard() {
        api.unlikeCard(props.card._id)
          .then((data) => {
            console.log('card unliked', data);
          })
          .catch((err) => {
            console.log('error', err);
          })
      }

    function likeToggle() {
        if (isLiked()) {
            unlikeCard();
            console.log('this card is UNLIKED', isLiked());
        } else {
            likeCard();
            console.log('this card is LIKED', isLiked());
        }
    }


    // USE EFFECT
    React.useEffect(() => {
        console.log('isLiked', isLiked());
        // console.log('likecardeffect', props.onlikeCard(props.card._id))
    })

    return (
        <>

            <article className='element' key={props.card._id}>
                <div className='element__image' style={imageStyle}></div>
                <button className='element__delete-button button-effect' aria-label='delete' onClick={getDeleteCardId}></button>
                <div className='element__bar'>
                    <h2 className='element__title'>{props.card.name}</h2>
                    <div className='element__likes-container'>
                        <button className={`element__like-button ${isLiked() ? 'element__like-button_active' : ''}`} type='button' aria-label='like' onMouseDown={getLikeId} onClick={likeToggle}></button>
                        <span className='element__likes-count'>{props.card.likes.length}</span>
                    </div>
                </div>
            </article>

        </>
    );
}
// <=====

export default Card;