import { useState } from "react";

const TaskForm = ({ onAgregar, guardando }) => {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mínimo 3 caracteres limpios
    if (titulo.trim().length < 3) {
      setError("El minimo del titulo es de 3 caracteres.");
      return;
    }
    // Se ejecuta la función (agregar) desde NewTaskView
    const exito = await onAgregar(titulo.trim());
    if (exito) {
      setTitulo("");
      setError("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="section-title">
        AGREGAR NUEVA TAREA
      </h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Estudiar para prueba de Física"
          disabled={guardando}
          style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
        />
        <button type="submit" disabled={guardando} className="btn btn-primary">
          {guardando ? "Guardando..." : "Agregar"}
        </button>
      </div>
      {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
    </form>
  );
};
export default TaskForm;