import { type FC } from "react";
import "./button.scss";

type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "button" | "reset";
  handleClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  handleClick,
  type,
  style,
  disabled,
}) => {
  return (
    <button
      type={type}
      className="btn"
      disabled={disabled}
      onClick={handleClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
