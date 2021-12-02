import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

export default function Register() {
    const history = useHistory();

    const API_URL = "http://localhost:3000";

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(API_URL+'/register', {
            pseudo: name,
            email: email,
            password: password,
            type: "member"
        })
            .then(function (response) {
                console.log(response);
                history.push('/login');
            })
            .catch(function (error) {
                console.log(error);
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

                    <form onSubmit={handleSubmit} method="post" className="form-inline w-400 mw-full">
                        <div className="form-group">
                            <input type="email" value={email}
                                   onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" id="email" required="required" />
                        </div>
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
                                <Link to="login" className="btn" type="button">Back to login</Link>
                            </div>
                            <input type="submit" className="btn btn-primary ml-auto" value="Register" />
                        </div>
                    </form>
                </div>

            </div>
            </body>
        </>
    )
}