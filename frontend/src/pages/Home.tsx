import React from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'

function Home() {
    // TODO: make these phrases come from openai

    // TODO: fix typewriter to be like chatgpt's, break this into components, create react router and have buttons link to login and signup pages
    const [text] = useTypewriter({
        words: ["on how to create an efficient database", "to solve a Sudoku Puzzle", "to solve a coding problem in linear time"],
        loop: 0,
        typeSpeed: 20,
        deleteSpeed: 0,
        delaySpeed: 2000
    })
    return ( 
        <section id="home">
            <section id="left-home">
                <nav style={{position: "absolute"}}>
                    <span >VirtuAI</span>
                    <img src="../../public/appLogo.png" alt="" />
                </nav>
                <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                    <h1 style={{fontSize: "35px", fontWeight: "800"}}>Brainstorm ideas <span style={{display: "block", fontWeight: "400"}}>{text}<Cursor/></span></h1>
                </div>
            </section>
            <section id="right-home">Hi</section>
        </section>
    );
}

export default Home;