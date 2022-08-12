function Button({ className, children, onClick, disabled, type, HTMLtype }) {
  return (
    <button
      className={`button ${type} relative flex items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={HTMLtype}
    >
      {children}
    </button>
  );
}

export default Button;
