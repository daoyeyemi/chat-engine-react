import React from 'react'
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";
import Signup from "../Signup/Signup";

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
        </Switch>
    )
}

export default App
