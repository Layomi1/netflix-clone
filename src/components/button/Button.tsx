import { type FC } from "react";
import "./button.scss";

type ButtonProps = {
  img?: string;
  desc: string;
  handleClick: () => void;
};

const Button: FC<ButtonProps> = ({ img, desc, handleClick }) => {
  return (
    <button className="btn" onClick={handleClick} style={{}}>
      <img src={img} alt={desc} />
      <span>{desc}</span>
    </button>
  );
};

export default Button;
