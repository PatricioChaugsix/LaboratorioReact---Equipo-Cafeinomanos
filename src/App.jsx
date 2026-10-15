import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Modal from './components/Modal'
import SummaryView from './views/SummaryView'
import TasksView from './views/TasksView'
import NewTaskView from './views/NewTaskView'
import useTareas from './hooks/useTareas'

function App() {
  const [vista, setVista] = useState('resumen')
  const { tareas, cargando, guardando, error, crearTarea, alternarEstado, editarTitulo, eliminarTarea, } = useTareas()
  // Estado local para seleccionar tarea a eliminar en el Modal.
  const [tareaAEliminar, setTareaAEliminar] = useState(null)
  // Confirmar eliminación desde el Modal RF07.
  const handleConfirmarEliminar = async () => {
    if (tareaAEliminar) {
      await eliminarTarea(tareaAEliminar)
      setTareaAEliminar(null)
    }
  }
  return (
    <main className="app-container">
      <Header title="TaskCampus" description="Gestor de tareas académicas" />
      <Navigation vistaActual={vista} onCambiarVista={setVista} />
      {cargando && <p className="status-message info">
        Cargando...</p>}
      {error && <p className="status-message error">
        Error: {error}</p>}
      {guardando && <p className="status-message warning">
        Sincronizando...</p>}
      {!cargando && (
        <>
          {vista === 'resumen' && (
            <SummaryView tareas={tareas} />
          )}
          {vista === 'tareas' && (
            <TasksView
              tareas={tareas}
              onAlternar={alternarEstado}
              onEditar={editarTitulo}
              onEliminar={(id) => setTareaAEliminar(id)}
              deshabilitado={guardando}
            />
          )}
          {vista === 'nueva' && (
            <NewTaskView
              onAgregar={crearTarea}
              guardando={guardando}
              onTareaCreada={() => setVista('tareas')}
            />
          )}
        </>
      )}
      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Esta seguro de eliminar esta tarea :O ?"
        onConfirmar={handleConfirmarEliminar}
        onCancelar={() => setTareaAEliminar(null)}
        deshabilitado={guardando}
      />
    </main>
  )
}
export default App