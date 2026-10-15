const Modal = ({ visible, mensaje, onConfirmar, onCancelar, deshabilitado }) => {
  if (!visible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{mensaje}</p>
        <div className="modal-acciones">
          <button 
            className="btn btn-danger" onClick={onConfirmar} disabled={deshabilitado}>
            Confirmar
          </button>
          <button 
            className="btn btn-secondary" onClick={onCancelar} disabled={deshabilitado}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;