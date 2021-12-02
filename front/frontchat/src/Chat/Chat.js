import React from "react";

export default function Chat() {
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
                    Chat
                </h2>
                <p>
                    Salut t po beau
                </p>
            </div>

            <div className="sidebar-divider"></div>

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
            <textarea className="form-control" placeholder="Enter your message here"></textarea>
        </nav>

    </div>
    </body>
</>
    )
}