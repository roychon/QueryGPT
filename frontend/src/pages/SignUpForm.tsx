import React, { HTMLInputTypeAttribute, LegacyRef, useEffect, useRef, useState } from "react";
import "../style/form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios"
import { useAuth } from "../context/authContext";

type FormInput = {
    text: string
}

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const auth = useAuth()
    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        const node: HTMLInputElement = inputRef.current!
        node.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Username: ", username)
        console.log("Password: ", password)
        try {
            await auth?.signup(username, password)
            navigate("/chats")
        } catch (e) {
            // TODO: add a warning message that says user already registered
            console.log("User already registered")
        }

        // console.log(auth)
    }

// TODO: add backend functionality, add google auth login section
// TODO: add states for username, password and add onSubmit event handler, where you fetch to backend using axios
    return ( 
        <form id="form" onSubmit={handleSubmit}>
            <section className="form-wrapper">
                <img src="../public/appLogo.png" alt="VirtuAI logo" />
                <section className="text" style={{marginTop: "-40px"}}>
                    <h1>Create your account</h1>
                    <p className="form-subtext">Please enter your details to sign up</p>
                </section>
                <section className="form-input">
                    <p className="input-box">
                        <label htmlFor="username">Username</label>
                        <input type="text" ref={inputRef} id="username" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} required />
                    </p>
                    <p className="input-box">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                    </p>
                    <button id="sign-up-btn" type="submit">Sign Up</button>
                </section>
                <section className="link">
                    <p> Already have an accout? </p>
                    <Link to="../login">Log In</Link>
                </section>
                <section className="auth2">
                    <button type="button" className="google-btn" >Sign up with Google</button>
                    <button type="button" className="github-btn" >Sign up with Github</button>
                </section>
            </section>
        </form>
    );
}



export default SignUpForm;