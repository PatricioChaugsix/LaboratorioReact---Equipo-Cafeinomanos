function TaskSummary({ total, pendientes, completadas }) {
  return (
    <section className="card">
      <h2 className="section-title">Resumen</h2>
      <p>Tienes {pendientes} tareas pendientes</p>
      <p>Completadas: {completadas} de {total}</p>
    </section>
  )
}

export default TaskSummary
