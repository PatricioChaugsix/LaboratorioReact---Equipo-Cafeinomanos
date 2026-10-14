import { useEffect, useState } from 'react'
import { obtenerTareas, guardarTareas, crearTarea } from '../services/tareasService'

function useTareas() {
  const [tareas, setTareas] = useState(obtenerTareas)

  useEffect(() => {
    guardarTareas(tareas)
  }, [tareas])

  function agregarTarea(datos) {
    setTareas((actuales) => [...actuales, crearTarea(datos)])
  }

  function alternarTarea(id) {
    setTareas((actuales) =>
      actuales.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    )
  }

  function eliminarTarea(id) {
    setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id))
  }

  const pendientes = tareas.filter((tarea) => !tarea.completada).length
  const completadas = tareas.length - pendientes

  return { tareas, pendientes, completadas, agregarTarea, alternarTarea, eliminarTarea }
}

export default useTareas
