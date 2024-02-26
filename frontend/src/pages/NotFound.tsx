import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <p>404 Not Found</p>
            <Link to="/">Return Home</Link>
        </>
    )
}
