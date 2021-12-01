import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from "./Login/Login";
import ChatPage from "./Chat/Chat";

export default function App() {
    return (
        <Router>
                <Switch>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
        </Router>
    );
}

function Chat() {
    return ChatPage();
}

function Login() {
    return LoginPage();
}