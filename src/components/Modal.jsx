import Button from './Button'

function Modal({ abierto, titulo, onCerrar, children }) {
  if (!abierto) return null

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(evento) => evento.stopPropagation()}>
        <h2 className="section-title">{titulo}</h2>
        <div className="modal-content">{children}</div>
        <Button onClick={onCerrar}>Cerrar</Button>
      </div>
    </div>
  )
}

export default Modal
