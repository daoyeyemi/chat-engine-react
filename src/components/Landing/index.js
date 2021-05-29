import React from 'react';
import { useHistory } from "react-router-dom";
import "./styles.css";

export const Landing = () => {
    let history = useHistory();

    function goToLogin() {
        history.push("/login")
    }

    function goToSignUp() {
        history.push("/signup")
    }
    
    return (
        <div className="container">
            <div className="title">let us chat</div>
            <div className="sub-title">an interactive chat application for coders and noncoders alike</div>
            <div className="buttons">
            <button onClick={goToLogin} type="button" class="btn btn-warning btn-lg">login</button>
            <button onClick={goToSignUp} type="button" class="btn btn-danger btn-lg">signup</button>
            </div>
        </div>
    )
}
