import { type FC } from "react";
import "./button.scss";

type ButtonProps = {
  children: React.ReactNode;

  handleClick: () => void;
  style?: React.CSSProperties;
};

const Button: FC<ButtonProps> = ({ children, handleClick, style }) => {
  return (
    <button className="btn" onClick={handleClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
