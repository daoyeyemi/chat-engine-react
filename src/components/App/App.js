import useAuth from "../../hooks/useAuth";
import React, { useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";
import Signup from "../Signup/Signup";
import "../../App.css";
import useResolved from "../../hooks/useResolved";
import { useHistory } from "react-router-dom";

function App() {

    const history = useHistory();
    const authUser = useAuth().authUser;
    const authResolved = useResolved(authUser);

    useEffect(() => {
        if (authResolved) {
            history.push(!!authUser ? "/" : "/login")
        }
    }, [authResolved, authUser, history]);

    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Chat} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    )
}

export default App;
