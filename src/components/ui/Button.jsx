
function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = ""
}) {
  const styles = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-700",
    secondary: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200",
    outline: "border border-zinc-200 bg-white hover:bg-zinc-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
