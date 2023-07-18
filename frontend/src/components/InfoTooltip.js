function InfoTooltip({ isOpen, onClose, name, infoPopupIcon, infoPopupTitle }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button opacity" onClick={onClose} />
        <img className="popup__sign-icon" src={infoPopupIcon} alt='Status Inform Icon'/>
        <h3 className="popup__title popup__title_centered">{infoPopupTitle}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;

