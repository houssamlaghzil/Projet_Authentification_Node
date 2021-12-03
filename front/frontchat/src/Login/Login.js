import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import logo from "../logo.svg";
import { SocketClient } from '../SocketClient'

const halfmoon = require("halfmoon");
const socketClient = SocketClient();

export default function Login() {
    const history = useHistory();

    const API_URL = "http://localhost:3002";

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        halfmoon.onDOMContentLoaded();
        
        if (!socket) {
            setSocket(socketClient)
        }

    }, [socket]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(API_URL+'/login', {
            pseudo: name,
            password: password,
        })
            .then(function (response) {
                let user = response.data.user;

                socket.emit("identity", user._id);

                const userDatas = {
                    userId: user._id,
                    pseudo: user.pseudo,
                    email: user.email,
                    role: user.type,
                    authorization: response.data.authorization
                }

                localStorage.setItem("userDatas", JSON.stringify(userDatas));

                let auth = localStorage.getItem("userAuthorization");
                axios.post(API_URL+'/chat/initiate', {
                    userIds: [localStorage.getItem("userId")]
                }, {
                    headers: {'Authorization': `Bearer ${auth}`}
                })
                    .then(function (response) {
                        console.log(response);
                        localStorage.setItem("currentChatId", response.data.chatRoom.chatId);
                        history.push('/chat/');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                if (error.response === undefined) {
                    halfmoon.initStickyAlert({
                        content: "An error occurred. Please try again later",
                        title: "Internal error",
                        alertType: "alert-danger",
                        hasDismissButton: true,
                        timeShown: 5000
                    });
                }
                else {
                    if (error.response.status === 400) {
                        halfmoon.initStickyAlert({
                            content: "Try entering your credentials again.",
                            title: "Incorrect credentials",
                            alertType: "alert-secondary",
                            hasDismissButton: true,
                            timeShown: 5000
                        });
                    }
                    else {
                        halfmoon.initStickyAlert({
                            content: "An error occurred. Please try again later",
                            title: "Internal error",
                            alertType: "alert-danger",
                            hasDismissButton: true,
                            timeShown: 5000
                        });
                    }
                }
            });
    }

    return(
        <>
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
                <meta name="viewport" content="width=device-width" />

            </head>
            <body className="with-custom-webkit-scrollbars with-custom-css-scrollbars" data-dm-shortcut-enabled="true" data-set-preferred-mode-onload="true">
            <div className="page-wrapper">

                <div className="sticky-alerts"/>

                <div className="content-wrapper">
                    <div>
                        <img id="logo" src={logo} alt="Logo" />

                    <form onSubmit={handleSubmit} method="post" className="form-inline w-400 mw-full">
                        <div className="form-group">
                            <input type="text" value={name}
                                   onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Username" id="username" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" id="password" required="required" />
                        </div>

                        <div className="form-group mb-0">
                            <div className="custom-control">
                                <Link to="register" className="btn" type="button">Register</Link>
                            </div>
                            <input type="submit" className="btn btn-primary ml-auto" value="Login" />
                        </div>
                    </form>
                </div>
                </div>

            </div>
            </body>
        </>
    )
}