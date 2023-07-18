function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button opacity" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" onSubmit={onSubmit} name={`popup_${name}-form`}>
          {children}
          <button type="submit" className="popup__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
