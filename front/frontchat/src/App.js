import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from "./Login/Login";
import RegisterPage from "./Register/Register";
import ChatPage from "./Chat/Chat";

import './App.css';

export default function App() {
    return (

        <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/chat">
                        <Chat />
                    </Route>
                    <Route exactPath="/">
                        <Login />
                    </Route>
                </Switch>
        </Router>
    );
}

function Login() {
    return LoginPage();
}

function Register() {
    return RegisterPage();
}

function Chat() {
    return ChatPage();
}