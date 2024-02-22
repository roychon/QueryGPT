import { Link, useNavigate } from "react-router-dom";
import "../style/form.css";
import React, { useRef, useState } from "react"
import { useAuth } from "../context/authContext";
import "../style/Link.css"


export default function LogInForm() {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await auth?.login(username, password)
            navigate("/chats")
        } catch (e) {
            console.log(e.message)
        }
        
    }

    return ( 
        <form id="form" onSubmit={handleSubmit}>
            <section className="form-wrapper">
                <img src="../public/appLogo.png" alt="VirtuAI logo" />
                <section className="text" style={{marginTop: "-40px"}}>
                    <h1>Welcome back</h1>
                    <p className="form-subtext">Please enter your details to log in</p>
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
                    <button id="sign-up-btn" type="submit">Log In</button>
                </section>
                <section className="link">
                    <p> Don't have an account? </p>
                    <Link to="../signup">Sign up</Link>
                </section>
                <section className="auth2">
                    <button type="button" className="google-btn" >Sign in with Google</button>
                    <button type="button" className="github-btn" >Sign in with Github</button>
                </section>
            </section>
        </form>
    );
}
