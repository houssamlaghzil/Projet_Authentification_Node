import socketIOClient from "socket.io-client";

const socketResult = socketIOClient("http://localhost:3002");

export const SocketClient = () => {
    return socketResult
}