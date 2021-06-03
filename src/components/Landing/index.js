import React from 'react';
import { useHistory } from "react-router-dom";

function Landing() {

    const history = useHistory();

    return (
        <div className="container">
            <div className="title" style={{ fontSize: "150px", textAlign: "center" }}>
                let us chat 2.0
            </div>
            <div className="buttons">
                <button onClick={history.push('/login')} className="btn btn-warning">login</button>
                <button onClick={history.push('/signup')} className="btn btn-danger">sign up</button>
            </div>
        </div>
    )
}

export default Landing;
