import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

type ButtonType = {
  text: string;
  handleClick: () => void;
};

// TODO: make this accept a function instead, so it is more of a generic button
function Button({ text, handleClick }: ButtonType) {
  const navigate: NavigateFunction = useNavigate();
  return (
    <button
      className="px-12 py-3 bg-bright-blue text-center rounded-xl hover:bg-light-blue"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
