function Main(props) {

    function handleEditAvatarClick() {
        document.querySelector('.popup_type_edit-avatar').classList.add('popup_opened');
    }

    function handleEditProfileClick() {
        document.querySelector('.popup_type_edit-profile').classList.add('popup_opened');
    }

    function handleAddCardClick() {
        document.querySelector('.popup_type_add-card').classList.add('popup_opened');
    }
    
    return (
        <>

        <main className='content'>

            <section className='profile'>
                <div className='profile__avatar-container'>
                    <img className='profile__avatar' src='#' alt='' />
                    <div className='profile__avatar-overlay'></div>
                    <button className='profile__avatar-button button-effect' type='button' aria-label='edit' onClick={handleEditAvatarClick}></button>
                </div>
                <div className='profile__info-container'>
                    <h1 className='profile__name'></h1>
                    <button className='profile__edit-button button-effect' type='button' aria-label='edit' onClick={handleEditProfileClick}></button>
                    <p className='profile__profession'></p>
                </div>
                <button className='profile__add-button button-effect' type='button' aria-label='add' onClick={handleAddCardClick}></button>
            </section>

            <section className='elements'>
            </section>

        </main>

        </>
    );
}

export { Main };