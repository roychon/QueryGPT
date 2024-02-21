import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "../style/button.css"

type ButtonType = {
    text: string,
    handleClick: () => void
}

// TODO: make this accept a function instead, so it is more of a generic button
function Button({text, handleClick}: ButtonType) {
    const navigate: NavigateFunction = useNavigate()
    return ( 
        <button id="home-button" onClick={handleClick}>{text}</button>
        // could also use Link as well
    );
}

export default Button;