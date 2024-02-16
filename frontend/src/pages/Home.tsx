import React, { useEffect } from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'
import HomeButton from "../components/Button";
import "../style/home.css";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Home() {
    // TODO: make the context come from ai
    const [text] = useTypewriter({
        words: ["on how to create an efficient database", "to solve a Sudoku Puzzle", "to solve a coding problem in linear time", "to enhance productivity in the workspace"],
        loop: 0,
        typeSpeed: 20,
        deleteSpeed: 20,
        delaySpeed: 2000
    })

    const auth = useAuth()
    const navigate = useNavigate()
    console.log(auth)

    // if logged in (cookies are verified), take them to chats section straight away
    useEffect(() => {
        if (auth?.isLoggedIn) {
            navigate("/chats")
        }
    }, [auth?.isLoggedIn])

    return ( 
        <section id="home">
            <section id={"left-home"}>
                <nav style={{position: "absolute"}}>
                    <span >VirtuAI</span>
                    <img src="../../public/appLogo.png" alt="" />
                </nav>
                <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                    <h1 style={{fontSize: "35px", fontWeight: "800"}}>Brainstorm ideas <span style={{display: "block", fontWeight: "400"}}>{text}<Cursor/></span></h1>
                </div>
            </section>
            <section id="right-home">
                <h1>Get Started</h1>
                <p className="button-div" style={{display: "flex", gap: "20px"}}>
                    <HomeButton text="Sign Up" />
                    <HomeButton text="Log In" />
                </p>
                <p style={{fontSize: "1rem", fontWeight: "500", position: "fixed", bottom: "10%"}}>VirtuAI</p>
            </section>
        </section>
    );
}

export default Home;
