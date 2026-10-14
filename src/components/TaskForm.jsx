import { useState } from 'react'
import Button from './Button'

const formularioVacio = { titulo: '', asignatura: '', fecha: '' }

function TaskForm({ onAgregar }) {
  const [formulario, setFormulario] = useState(formularioVacio)
  const [error, setError] = useState('')

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    if (formulario.titulo.trim() === '') {
      setError('El título es obligatorio')
      return
    }
    onAgregar(formulario)
    setFormulario(formularioVacio)
    setError('')
  }

  return (
    <form className="card task-form" onSubmit={manejarEnvio}>
      <h2 className="section-title">Nueva tarea</h2>

      <label>
        Título
        <input name="titulo" value={formulario.titulo} onChange={manejarCambio} />
      </label>

      <label>
        Asignatura
        <input name="asignatura" value={formulario.asignatura} onChange={manejarCambio} />
      </label>

      <label>
        Fecha de entrega
        <input type="date" name="fecha" value={formulario.fecha} onChange={manejarCambio} />
      </label>

      {error && <p className="form-error">{error}</p>}

      <Button type="submit">Agregar tarea</Button>
    </form>
  )
}

export default TaskForm
