import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SocketClient } from '../SocketClient'
import axios from "axios";

const socketClient = SocketClient();

export default function Chat() {

    const urlParamId = window.location.pathname.split('/chat/');
    const chatId = urlParamId[1];
    const auth = JSON.parse(localStorage.getItem("userDatas")).authorization;

    const history = useHistory();

    const API_URL = "http://localhost:3002";

    const [messages, setMessagesList] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!socket) {
            setSocket(socketClient)
        } else {
            socket.emit("subscribe", chatId);
        }

        async function getAllMessages() {
            const response = await axios.get(API_URL + '/chat/' + chatId + '', {
                headers: { 'Authorization': `Bearer ${auth}` }
            })

            const conversationList = []

            response.data.conversation.forEach(element => {
                conversationList.push({
                    user: element.postedByUser.pseudo,
                    message: element.message.messageText,
                    date: element.createdAt
                })
            });

            setMessagesList(conversationList)

            //console.log("Response : ", response.data.conversation);
        }

        if (messages.length === 0) {
            getAllMessages()
        }

        //console.log('Messages : ', messages);

    }, [socket, chatId, messages, auth]);

    const handleInitiate = (event) => {

        axios.post(API_URL + '/chat/initiate', {
            userIds: [localStorage.getItem("userId")]
        }, {
            headers: { 'Authorization': `Bearer ${auth}` }
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

        if (message) {

            axios.post(API_URL + '/chat/' + chatId + '/message', {
                messageText: message
            }, {
                headers: { 'Authorization': `Bearer ${auth}` }
            })
                .then(function (response) {
                    console.log(response);
                    socket.on("new message", (data) => {
                        setMessagesList([...messages, {
                            user: data.message.postedByUser.pseudo,
                            message: data.message.message.messageText,
                            date: data.message.createdAt,
                        }])
                    });
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

    const renderMessagesDiscussion = () => {

        console.log(messages);

        return messages.map((element, index) => {
            return (
                <div className="card" key={index}>
                    <h2 className="card-title">
                        {element.user}
                    </h2>
                    <p>
                        {element.message}
                    </p>
                    <p>{element.date}</p>
                </div> 
            )
        })
    }

    return (
        <>
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
                <meta name="viewport" content="width=device-width" />

            </head>
            <body className="with-custom-webkit-scrollbars with-custom-css-scrollbars" data-sidebar-shortcut-enabled="true" data-set-preferred-mode-onload="true">
                <div className="page-wrapper with-sidebar with-navbar-fixed-bottom" data-sidebar-type="full-height">
                    <div className="sticky-alerts" />

                    <div className="sidebar">

                        <div className="content">
                            <h2 className="content-title">
                                Chat rooms
                            </h2>
                            <button onClick={handleInitiate} className="btn btn-primary" type="button">+</button>
                        </div>

                        <div className="sidebar-divider" />

                        <div className="content">
                            <h2 className="content-title">
                                Chat
                            </h2>
                            <p>
                                Salut t po beau
                            </p>
                        </div>

                        <div className="sidebar-divider" />

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
                        {renderMessagesDiscussion()}
                    </div>

                    <nav className="navbar navbar-fixed-bottom">
                        <button onClick={handleLogout} className="btn btn-primary" type="button">Logout</button>
                        <textarea value={message}
                            onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Enter your message here" />
                        <button onClick={handleSubmit} className="btn btn-primary" type="button">Send</button>
                    </nav>

                </div>
            </body>
        </>
    )
}