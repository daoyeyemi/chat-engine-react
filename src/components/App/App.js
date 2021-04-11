import React from 'react'
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import Chat from "../Chat";
import Signup from "../Signup";

function App() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/chat" component={Chat} />
            <Route path="/signup" component={Signup} />
        </Switch>
    )
}

export default App
