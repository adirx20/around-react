import React from 'react';
import ReactDOM from 'react-dom';

// =====>
function Card(props) {
    return (
        <>

                <article className='element' key={props.card._id}>
                    <div className='element__image'></div>
                    <button className='element__delete-button button-effect' aria-label='delete'></button>
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