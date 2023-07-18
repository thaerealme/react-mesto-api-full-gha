import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const imageRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: imageRef.current.value
    })
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      isOpen={props.isOpen}
      children={<>
        <input ref={imageRef} type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" className="popup__input" required />
        <span className="popup__input-error avatar-error"></span>
      </>}
    />
  )
}
export default EditAvatarPopup;
