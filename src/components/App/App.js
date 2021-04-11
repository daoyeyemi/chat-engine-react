import React from 'react'
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";
import Signup from "../Signup/Signup";
import "../../App.css";

function App() {
    return (
        <div className="application">
            <Switch>
                <Route exact path="/" component={Chat} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
        
    )
}

export default App
