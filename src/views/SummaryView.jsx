import { useState } from 'react'
import TaskSummary from '../components/TaskSummary'
import Button from '../components/Button'
import Modal from '../components/Modal'

function SummaryView({ tareas, pendientes, completadas }) {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <>
      <TaskSummary total={tareas.length} pendientes={pendientes} completadas={completadas} />

      <section className="card">
        <h2 className="section-title">Acciones</h2>
        <Button onClick={() => setModalAbierto(true)}>Revisar tareas</Button>
      </section>

      <Modal abierto={modalAbierto} titulo="Revisión" onCerrar={() => setModalAbierto(false)}>
        <p>Tienes {pendientes} tareas pendientes por revisar</p>
      </Modal>
    </>
  )
}

export default SummaryView
