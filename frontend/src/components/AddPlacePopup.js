import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      isOpen={props.isOpen}
      children={<>
        <input type="text" name="name" onChange={handleChangeName} value={name} id="title" placeholder="Название" className="popup__input" minLength="2"
          maxLength="30" required />
        <span className="popup__input-error title-error"></span>
        <input type="url" name="link" onChange={handleChangeLink} value={link} id="link" placeholder="Ссылка на картинку" className="popup__input" required />
        <span className="popup__input-error link-error"></span>
      </>}
    />
  )
}

export default AddPlacePopup;
