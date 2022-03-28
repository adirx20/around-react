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
    const [selectedCardId, setSelectedCardId] = React.useState()

    // FUNCTIONS
    function isLiked() {
        return props.card.likes.some((person) => person._id === props.card._id);
    }

    function getCardId() {
        console.log('props.card', props.card._id);
        console.log('a', selectedCardId);
    }

    // function handleDeleteCardck() {
    //     api.deleteCard(props.card._id)
    //     .then((data) => {
    //         console.log(data)
    //     })
    // }

    // USE EFFECT
    React.useEffect(() => {
        console.log('isLiked', isLiked());
    })

    return (
        <>

            <article className='element' key={props.card._id}>
                <div className='element__image' style={imageStyle}></div>
                <button className='element__delete-button button-effect' aria-label='delete' onClick={getCardId}></button>
                <div className='element__bar'>
                    <h2 className='element__title'>{props.card.name}</h2>
                    <div className='element__likes-container'>
                        <button className='element__like-button' type='button' aria-label='like'></button>
                        <span className='element__likes-count'></span>
                    </div>
                </div>
            </article>

        </>
    );
}
// <=====

export default Card;
export { getCardId };