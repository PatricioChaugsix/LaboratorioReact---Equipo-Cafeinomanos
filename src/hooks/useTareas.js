import { useState, useEffect } from "react";
import {
  getTareas,
  postTarea,
  putTarea,
  deleteTarea,
} from "../services/tareasService";
const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  //indicador de operación En Curso.
  const [guardando, setGuardando] = useState(false); 
  const [error, setError] = useState(null);
  // Carga inicial de RF01.
  useEffect(() => {
    const cargarIniciales = async () => {
      setCargando(true);
      setError(null);
      try {
        const datos = await getTareas(10);
        const formateadas = datos.map((item) => ({
          id: item.id,
          titulo: item.title,
          completada: item.completed,
        }));
        setTareas(formateadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarIniciales();
  }, []);
  // Crear tarea (RF03) con ID local estable utilizando Date.now() para evitar duplicados con el ID 201 de JSONPlaceholder.
  const crearTarea = async (titulo) => {
    setGuardando(true);
    setError(null);
    try {
      const nuevaAPI = await postTarea(titulo);
      // Asignamos ID local único para evitar duplicados del ID 201 de JSONPlaceholder
      const nuevaTareaLocal = {
        id: Date.now(),
        titulo: nuevaAPI.title,
        completada: nuevaAPI.completed};
      setTareas((prev) => [nuevaTareaLocal, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setGuardando(false);
    }
  };
  // Cambiar estado completada/pendiente RF05.
  const alternarEstado = async (id) => {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return;
    setGuardando(true);
    setError(null);
    try {
      await putTarea(id, {
        title: tareaActual.titulo,
        completed: !tareaActual.completada,
      });
    } catch (err) {
      console.warn("API simulada: Se mantiene actualización en estado local para ID:", id);
    } finally {
      setTareas((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completada: !t.completada } : t
        )
      );
      setGuardando(false);
    }
  };
  // Editar título RF06.
  const editarTitulo = async (id, nuevoTitulo) => {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return;
    setGuardando(true);
    setError(null);
    try {
      await putTarea(id, {
        title: nuevoTitulo,
        completed: tareaActual.completada,
      });
    } catch (err) {
      console.warn("API simulada: Se mantiene actualización en estado local para ID:", id);
    } finally {
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, titulo: nuevoTitulo } : t)));
      setGuardando(false);
    }
  };
  // Eliminar tarea RF07.
  const eliminarTarea = async (id) => {
    setGuardando(true);
    setError(null);
    try {
      await deleteTarea(id);
    } catch (err) {
      console.warn("API simulada: Se mantiene eliminación en estado local para ID:", id);
    } finally {
      setTareas((prev) => prev.filter((t) => t.id !== id));
      setGuardando(false);
    }
  };
  return { tareas, cargando, guardando, error, crearTarea, alternarEstado, editarTitulo, eliminarTarea,};
};
export default useTareas;