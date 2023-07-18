import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    })
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
      isOpen={props.isOpen}
      children={<>
        <input type="text"
          name="name"
          id="name"
          value={name || ''}
          onChange={handleChangeName}
          placeholder="Имя"
          className="popup__input"
          minLength="2"
          maxLength="40"
          required />
        <span className="popup__input-error name-error"></span>
        <input type="text"
          name="description"
          placeholder="Род деятельности"
          id="description"
          value={description || ''}
          onChange={handleChangeDescription}
          className="popup__input"
          minLength="2"
          maxLength="200"
          required />
        <span className="popup__input-error description-error"></span>
      </>}
    />
  )
}

export default EditProfilePopup;
