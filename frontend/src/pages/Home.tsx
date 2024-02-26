import React, { useEffect, useLayoutEffect } from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'
import Button from "../components/Button";
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
    // console.log(auth)

    // if logged in (cookies are verified), take them to chats section straight away
    useLayoutEffect(() => {
        if (auth?.isLoggedIn) {
            navigate("/chats")
        }
    }, [auth?.isLoggedIn])

    return ( 
        <section className="h-screen w-screen lg:flex overflow-hidden">
            <section className="h-3/5 bg-dark-purple text-medium-purple px-4 py-3 lg:w-3/5 lg:h-full">
                <nav className="flex align-middle">
                    <span className="font-bold text-[20px]">virtual.ai</span>
                    <img src="../../public/appLogo.png" alt="Virtual.ai Logo" className=" h-[50px] mt-[-10px]"/>
                </nav>
                <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                    <h1 className=" text-[30px] font-bold">Brainstorm ideas <span style={{display: "block", fontWeight: "400"}}>{text}<Cursor/></span></h1>
                </div>
            </section>
            <section className="bg-black h-2/5 text-white p-4 text-center lg:w-2/5 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:items-center">
                <h1 className="font-bold text-2xl py-5">Get Started</h1>
                <p className="flex gap-5 justify-center">
                    <Button text="Sign Up" handleClick={() => navigate("/signup")} />
                    <Button text="Log In" handleClick={() => navigate("/login")} />
                </p>
            </section>

            <p className="text-white fixed text-base font-base bottom-4 px-4">Built with ❤️ by Roy Chon</p>
        </section>
    );
}

export default Home;
