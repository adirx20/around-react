// =====>
function ImagePopup(props) {
    return (
        <>

            <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
                <figure className='popup__frame'>
                    <button className='popup__close-button button-effect' type='button' aria-label='close'></button>
                    <img className='popup__image' />
                    <figcaption className='popup__caption'></figcaption>
                </figure>
            </div>

        </>
    );
}
// <=====

export default ImagePopup;