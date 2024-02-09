import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "../style/button.css"

type BtnTxt = {
    text: string
}

function HomeButton({text}: BtnTxt) {
    const navigate: NavigateFunction = useNavigate()
    return ( 
        <button id="home-button" onClick={() => navigate(text == "Sign Up" ? "/signup" : "/login")}>{text}</button>
        // could also use Link as well
    );
}

export default HomeButton;