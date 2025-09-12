import { type FC } from "react";
import "./button.scss";

type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
  handleClick?: () => void;
  style?: React.CSSProperties;
};

const Button: FC<ButtonProps> = ({ children, handleClick, type, style }) => {
  return (
    <button type={type} className="btn" onClick={handleClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
