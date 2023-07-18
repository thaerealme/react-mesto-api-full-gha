function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button type="button" className="popup__close-button opacity" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__image-description">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
