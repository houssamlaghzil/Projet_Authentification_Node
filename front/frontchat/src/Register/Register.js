import React from "react";
import {Link} from "react-router-dom";

export default function Register() {
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
                    <form action="register" method="post" className="form-inline w-400 mw-full">
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" id="email" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" id="username" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" id="password" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm your password" id="password_confirm" required="required" />
                        </div>
                        <input type="hidden" id="user_type" />
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