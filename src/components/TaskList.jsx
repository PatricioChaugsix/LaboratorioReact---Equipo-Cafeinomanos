import TaskItem from './TaskItem'

function TaskList({ title, tareas, onSeleccionar, onAlternar, onEliminar }) {
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>
      {tareas.length === 0 ? (
        <p>No hay tareas todavía.</p>
      ) : (
        <ul className="task-list">
          {tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              onSeleccionar={onSeleccionar}
              onAlternar={onAlternar}
              onEliminar={onEliminar}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
