import React from 'react';
import ReactDOM from 'react-dom';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup';
import Card from '../components/Card';

// =====>
function Main(props) {
    // CURRENT USER CONTEXT
    const currentUser = React.useContext(CurrentUserContext); // ------------------------------------------------- CHECK WHY ITS UNDEFINED

    // USER DATA STATE VARIABLES
    const [userId, setUserId] = React.useState('');

    // CARDS STATE VARIABLES
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);

    // FUNCTIONS
    // HANDLE CARD LIKE
    function handleCardLike(card) {
        const isLiked = card.likes.some(like => like._id === currentUser._id); 

        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
        });
    }

    // HANDLE CARD DELETE
    function handleCardDelete(card) {
        const isOwn = card.owner._id === currentUser._id;

        isOwn && api.deleteCard(card._id)
        .then((res) => {
            console.log('asdasdasdasdasdasd', res._id);
            setCards((state) => state.filter((currentCard) => currentCard._id === card._id)); // NEED TO CONTINUE HERE! 
        });
    }

    function handleImage() {
        props.onCardClick();
    }

    function handleDeleteCardClick(id) {
        setSelectedCard(id);
        props.deleteCardButton();
    }

    // function handleLikeButtonClick(id) {
    //     setSelectedCard(id);
    // }

    // MOUNTING
    React.useEffect(() => {
        Promise.all([api.getInitialCards()])
            .then(([cardsData]) => {
                // USER
                console.log('ahasdasdasdasda', currentUser);
                // CARDS
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (

        <main className='content'>

            <section className='profile'>
                <div className='profile__avatar-container'>
                    <img className='profile__avatar' src={currentUser.avatar} alt={`${currentUser.name} Avatar`} />
                    <div className='profile__avatar-overlay'></div>
                    <button className='profile__avatar-button button-effect' type='button' aria-label='edit' onClick={props.onEditAvatarClick}></button>
                </div>
                <div className='profile__info-container'>
                    <h1 className='profile__name'>{currentUser.name}</h1>
                    <button className='profile__edit-button button-effect' type='button' aria-label='edit' onClick={props.onEditProfileClick}></button>
                    <p className='profile__profession'>{currentUser.about}</p>
                </div>
                <button className='profile__add-button button-effect' type='button' aria-label='add' onClick={props.onAddCardClick}></button>
            </section>

            <section className='elements'>
                {
                    cards.map((element) => (
                        <Card
                            card={element} key={element._id}
                            onDeleteCardClick={handleDeleteCardClick}
                            // onLikeClick={handleLikeButtonClick}
                            userId={userId}
                            onCardClick={props.onImageClick}
                            renderImage={handleImage}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                    ))
                }
            </section>

        </main>

    );
}
// <=====

export default Main;