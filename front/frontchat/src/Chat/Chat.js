import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import halfmoon from "halfmoon";

export default function Chat() {

    const history = useHistory();

    const API_URL = "http://localhost:3002";

    const [message, setMessage] = useState("");

    const handleInitiate = (event) => {
        let auth = localStorage.getItem("userAuthorization");
        axios.post(API_URL+'/chat/initiate', {
            userIds: [localStorage.getItem("userId")]
        }, {
            headers: {'Authorization': `Bearer ${auth}`}
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message !== "" && message !== " ") {
            let auth = localStorage.getItem("userAuthorization");

            axios.post(API_URL+'/chat/'+localStorage.getItem("currentChatId")+'/message', {
                messageText: message
            }, {
                headers: {'Authorization': `Bearer ${auth}`}
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const handleLogout = (event) => {
        event.preventDefault();

        localStorage.clear();
        history.push('/login');
    }

    return(
        <>
        <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
        <meta name="viewport" content="width=device-width" />

        </head>
    <body className="with-custom-webkit-scrollbars with-custom-css-scrollbars" data-sidebar-shortcut-enabled="true" data-set-preferred-mode-onload="true">
    <div className="page-wrapper with-sidebar with-navbar-fixed-bottom" data-sidebar-type="full-height">
        <div className="sticky-alerts"/>

        <div className="sidebar">

            <div className="content">
                <h2 className="content-title">
                    Chat rooms
                </h2>
                <button onClick={handleInitiate} className="btn btn-primary" type="button">+</button>
            </div>

            <div className="sidebar-divider"/>

            <div className="content">
                <h2 className="content-title">
                    Chat
                </h2>
                <p>
                    Salut t po beau
                </p>
            </div>

            <div className="sidebar-divider"/>

            <div className="content">
                <h2 className="content-title">
                    Chat
                </h2>
                <p>
                    Salut t po beau
                </p>
            </div>
        </div>
        <div className="content-wrapper">
            <div className="card">
                <h2 className="card-title">
                    Guillaume
                </h2>
                <p>
                    The weather forecast didn't say that, but the steel plate in his hip did. He had learned over the
                    years to trust his hip over the weatherman. It was going to rain, so he better get outside and
                    prepare...
                </p>
            </div>
        </div>

        <nav className="navbar navbar-fixed-bottom">
            <button onClick={handleLogout} className="btn btn-primary" type="button">Logout</button>
            <textarea value={message}
                      onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Enter your message here"/>
            <button onClick={handleSubmit} className="btn btn-primary" type="button">Send</button>
        </nav>

    </div>
    </body>
</>
    )
}