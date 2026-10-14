import TaskForm from '../components/TaskForm'

function NewTaskView({ onAgregar, onTareaCreada }) {
  function manejarAgregar(datos) {
    onAgregar(datos)
    onTareaCreada()
  }

  return <TaskForm onAgregar={manejarAgregar} />
}

export default NewTaskView
