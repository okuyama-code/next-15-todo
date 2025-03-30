type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "blue" | "red" | "green" | "gray";
};

export function Button({ children, color = "blue", className = "", ...props }: ButtonProps) {
  const base =
    "h-10 px-4 py-2 text-white text-sm rounded-md hover:opacity-90 disabled:opacity-50 whitespace-nowrap";

  const colorMap: Record<string, string> = {
    blue: "bg-blue-400 hover:bg-blue-500",
    red: "bg-red-400 hover:bg-red-500",
    green: "bg-green-400 hover:bg-green-500",
    gray: "bg-gray-400 hover:bg-gray-500",
  };

  return (
    <button {...props} className={`${base} ${colorMap[color]} ${className}`}>
      {children}
    </button>
  );
}
