function Button({ children, onClick, variante = 'primario', type = 'button' }) {
  const clase = variante === 'secundario' ? 'task-button-secondary' : 'task-button'
  return (
    <button type={type} onClick={onClick} className={clase}>
      {children}
    </button>
  )
}

export default Button
