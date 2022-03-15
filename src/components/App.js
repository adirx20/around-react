import logo from '../images/header-logo.svg';
import '../index.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

function App() {
  return (
    <>

      <div className='page'>

        <Header logo={logo} />

        <Main />

        <Footer />


        <div className='popup popup_type_edit-profile'>
          <div className='popup__container'>
            <button className='popup__close-button button-effect' type='button' aria-label='close'></button>
            <h2 className='popup__title'>Edit profile</h2>
            <form className='form' name='profile'>
              <input id='name-input' className='form__input form__input_type_name' type='text' name='name' placeholder='Name'
                value='' required minLength='2' maxLength='40' />
              <span id='name-input-error' className='form__input-error-message'></span>
              <input id='proffession-input' className='form__input form__input_type_profession' type='text' name='profession'
                placeholder='About me' value='' required minLength='2' maxLength='200' />
              <span id='proffession-input-error' className='form__input-error-message'></span>
              <button className='form__save-button' type='submit'>Save</button>
            </form>
          </div>
        </div>

        <div className='popup popup_type_edit-avatar'>
          <div className='popup__container'>
            <button className='popup__close-button button-effect' type='button' aria-label='close'></button>
            <h2 className='popup__title'>Change profile picture</h2>
            <form className='form' name='new'>
              <input id='avatar-link-input' className='form__input form__input_type_avatar-link' type='url' name='avatar-link'
                placeholder='Image URL' value='' required />
              <span id='avatar-link-input-error' className='form__input-error-message'></span>
              <button className='form__save-button' type='submit'>Save</button>
            </form>
          </div>
        </div>

        <div className='popup popup_type_add-card'>
          <div className='popup__container'>
            <button className='popup__close-button button-effect' type='button' aria-label='close'></button>
            <h2 className='popup__title'>New Place</h2>
            <form className='form' name='new'>
              <input id='card-input' className='form__input form__input_type_card-title' type='text' name='card-title'
                placeholder='Title' value='' required minLength='1' maxLength='30' />
              <span id='card-input-error' className='form__input-error-message'></span>
              <input id='card-link-input' className='form__input form__input_type_card-link' type='url' name='card-link'
                placeholder='Image URL' value='' required />
              <span id='card-link-input-error' className='form__input-error-message'></span>
              <button className='form__save-button' type='submit'>Save</button>
            </form>
          </div>
        </div>

        <div className='popup popup_type_delete-card'>
          <div className='popup__container'>
            <button className='popup__close-button button-effect' type='button' aria-label='close'></button>
            <h2 className='popup__title'>Are you sure?</h2>
            <form className='form' name='profile'>
              <button className='form__save-button' type='submit'>Yes</button>
            </form>
          </div>
        </div>

        <div className='popup popup_type_image'>
          <figure className='popup__frame'>
            <button className='popup__close-button button-effect' type='button' aria-label='close'></button>
            <img className='popup__image' />
            <figcaption className='popup__caption'></figcaption>
          </figure>
        </div>

      </div>

    </>

  );
}

export default App;
