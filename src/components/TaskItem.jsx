import Button from './Button'

function TaskItem({ tarea, onSeleccionar, onAlternar, onEliminar }) {
  return (
    <li className={tarea.completada ? 'task-item task-item-done' : 'task-item'}>
      <label className="task-info">
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={() => onAlternar(tarea.id)}
        />
        <span>
          <strong>{tarea.titulo}</strong>
          {tarea.asignatura && <small> · {tarea.asignatura}</small>}
        </span>
      </label>
      <div className="task-actions">
        <Button onClick={() => onSeleccionar(tarea)}>Seleccionar</Button>
        <Button variante="secundario" onClick={() => onEliminar(tarea.id)}>
          Eliminar
        </Button>
      </div>
    </li>
  )
}

export default TaskItem
