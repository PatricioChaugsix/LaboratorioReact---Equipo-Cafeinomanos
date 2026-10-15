import { useState } from "react";

const TaskItem = ({ tarea, onToggle, onEditar, onEliminar, deshabilitado }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo);
  const [errorEdicion, setErrorEdicion] = useState("");
  const handleGuardarEdicion = () => {
    const tituloLimpio = nuevoTitulo.trim();
    if (tituloLimpio.length < 3) {
      setErrorEdicion("Mínimo 3 caracteres.");
      return;
    }
    setErrorEdicion("");
    setEditando(false);
    if (tituloLimpio !== tarea.titulo) {
      onEditar(tarea.id, tituloLimpio);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGuardarEdicion();
    if (e.key === "Escape") {
      setNuevoTitulo(tarea.titulo);
      setErrorEdicion("");
      setEditando(false);
    }
  };
  let textoBadge = "pendiente";
  let claseBadge = "badge badge-warning";
  let estiloTitulo = { cursor: "pointer", textDecoration: "none" };
  if (tarea.completada) {
    textoBadge = "completada";
    claseBadge = "badge badge-success";
    estiloTitulo = { cursor: "pointer", textDecoration: "line-through" };
  }
  let textoBoton = "Completar";
  let claseBoton = "btn btn-primary";
  if (tarea.completada) {
    textoBoton = "Desmarcar";
    claseBoton = "btn btn-secondary";
  }

  return (
    <li className="task-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
      <div className="task-info" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          className={claseBadge}
          onClick={() => !deshabilitado && onToggle(tarea.id)}
          style={{ cursor: "pointer", padding: "4px 8px", borderRadius: "4px" }}>
          {textoBadge}
        </span>
        {editando && (
          <div>
            <input
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              onBlur={handleGuardarEdicion}
              onKeyDown={handleKeyDown}
              disabled={deshabilitado}
              autoFocus
              style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
            />
            {errorEdicion && <span style={{ color: "red", fontSize: "0.75rem", marginLeft: "4px" }}>{errorEdicion}</span>}
          </div>
        )}
        {!editando && (
          <span
            className="task-title"
            onDoubleClick={() => !deshabilitado && setEditando(true)}
            style={estiloTitulo}
            title="Doble clic para editar el título">
            {tarea.titulo}
          </span>
        )}
      </div>
      <div className="task-actions" style={{ display: "flex", gap: "4px" }}>
        <button
          type="button"
          className={claseBoton}
          onClick={() => onToggle(tarea.id)}
          disabled={deshabilitado}>
          {textoBoton}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onEliminar(tarea.id)}
          disabled={deshabilitado}>
          Eliminar
        </button>
      </div>
    </li>
  );
};
export default TaskItem;