import { useState } from 'react'
import TaskList from '../components/TaskList'
import Modal from '../components/Modal'

function TasksView({ tareas, onAlternar, onEliminar }) {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)

  return (
    <>
      <TaskList
        title="Listado de tareas"
        tareas={tareas}
        onSeleccionar={setTareaSeleccionada}
        onAlternar={onAlternar}
        onEliminar={onEliminar}
      />

      <Modal
        abierto={tareaSeleccionada !== null}
        titulo="Tarea seleccionada"
        onCerrar={() => setTareaSeleccionada(null)}
      >
        {tareaSeleccionada && (
          <>
            <p><strong>{tareaSeleccionada.titulo}</strong></p>
            <p>Asignatura: {tareaSeleccionada.asignatura || 'Sin asignatura'}</p>
            <p>Entrega: {tareaSeleccionada.fecha || 'Sin fecha'}</p>
            <p>Estado: {tareaSeleccionada.completada ? 'Completada' : 'Pendiente'}</p>
          </>
        )}
      </Modal>
    </>
  )
}

export default TasksView
