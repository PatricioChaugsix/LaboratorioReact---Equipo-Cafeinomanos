import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import SummaryView from './views/SummaryView'
import TasksView from './views/TasksView'
import NewTaskView from './views/NewTaskView'
import useTareas from './hooks/useTareas'

function App() {
  const [vista, setVista] = useState('resumen')
  const { tareas, pendientes, completadas, agregarTarea, alternarTarea, eliminarTarea } = useTareas()

  return (
    <main className="app-container">
      <Header title="TaskCampus" description="Gestor de tareas académicas" />
      <Navigation vistaActual={vista} onCambiarVista={setVista} />

      {vista === 'resumen' && (
        <SummaryView tareas={tareas} pendientes={pendientes} completadas={completadas} />
      )}
      {vista === 'tareas' && (
        <TasksView tareas={tareas} onAlternar={alternarTarea} onEliminar={eliminarTarea} />
      )}
      {vista === 'nueva' && (
        <NewTaskView onAgregar={agregarTarea} onTareaCreada={() => setVista('tareas')} />
      )}
    </main>
  )
}

export default App