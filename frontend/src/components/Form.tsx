import React, { HTMLInputTypeAttribute, LegacyRef, useEffect, useRef, useState } from "react";
import "../style/form.css";
import { Link, useNavigate } from "react-router-dom";

type FormInput = {
    text: string
}

function Form({text}: FormInput) {
    const [login, setLogin] = useState(true)
    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        text == "login" ? setLogin(true) : setLogin(false)
        const node: HTMLInputElement = inputRef.current!
        node.focus()
    }, [login])

// TODO: have password eye part, add ref for username and focus it on useEffect, create legend for input form, add google auth login section
    return ( 
        <form id="form">
            <section className="form-wrapper">
                <img src="../public/appLogo.png" alt="VirtuAI logo" />
                <section className="text" style={{marginTop: "-40px"}}>
                    <h1>{text == "login" ? "Welcome back" : "Create your Account"}</h1>
                    <p className="form-subtext">Please enter your details to {text}</p>
                </section>
                <section className="form-input">
                    <p className="input-box">
                        <label htmlFor="username">Username</label>
                        <input type="text" ref={inputRef} id="username" placeholder="Enter your username" required />
                    </p>
                    <p className="input-box">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" placeholder="Password" required/>
                    </p>
                    <button id="sign-up-btn" type="submit">Sign Up</button>
                </section>
                <section className="link">
                    <p> {login ? "Don't have an account? " : "Already have an account? "} </p>
                    <Link to={text}>{text}</Link>
                </section>
                <section className="auth2">
                    <button type="button" className="google-btn" >Sign in with Google</button>
                    <button type="button" className="github-btn" >Sign in with Github</button>
                </section>
            </section>
        </form>
    );
}



export default Form;