type OverlayType = {
  children: any,
  closeModal: any
}

const Overlay = ({ children, closeModal }: OverlayType) => {
  return (
    <div id="overlay">
      <div id="overlay-close-area" onClick={closeModal}></div>
      <div id="content">
        <button id="overlay-close-button" onClick={closeModal}>×</button>
        {children}
      </div>
    </div>
  )
}

export default Overlay
