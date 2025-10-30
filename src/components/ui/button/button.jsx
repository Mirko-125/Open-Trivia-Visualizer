import "./button.css";

const Button = ({ onClick, children, className = "", ...props }) => {
  return (
    <button onClick={onClick} className={`button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
