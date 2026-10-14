const CLAVE_STORAGE = 'taskcampus-tareas'

const tareasIniciales = [
  { id: 1, titulo: 'Aprender qué es React', asignatura: 'Desarrollo Web', fecha: '', completada: false },
  { id: 2, titulo: 'Crear proyecto con Vite', asignatura: 'Desarrollo Web', fecha: '', completada: false },
  { id: 3, titulo: 'Practicar JSX', asignatura: 'Desarrollo Web', fecha: '', completada: false },
]

export function obtenerTareas() {
  const guardadas = localStorage.getItem(CLAVE_STORAGE)
  if (!guardadas) return tareasIniciales
  try {
    return JSON.parse(guardadas)
  } catch {
    return tareasIniciales
  }
}

export function guardarTareas(tareas) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas))
}

export function crearTarea({ titulo, asignatura, fecha }) {
  return {
    id: Date.now(),
    titulo: titulo.trim(),
    asignatura: asignatura.trim(),
    fecha,
    completada: false,
  }
}
