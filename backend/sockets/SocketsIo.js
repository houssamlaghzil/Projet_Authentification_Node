const users = [];

const subscribeOtherUser = (chat, otherUserId) => {
    const userSockets = users.filter(
      (user) => user.userId === otherUserId
    );
    
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);

      if (socketConn) {
        socketConn.join(chat);
      }
    
    });
}

export default {

    connexion: (socket) => {

        console.log('Socket io connected', socket.id);
        
        socket.on('identity', (userId) => {
            users.push({
              socketId: socket.id,
              userId: userId,
            });
    
            console.log('Socket listening identity connection user : ', users);
        });

        socket.on("subscribe", (chat, otherUserId = "") => {
            subscribeOtherUser(chat, otherUserId);
            socket.join(chat);
    
            console.log('Socket listening chatroom join : ', chat);
        });

        socket.on("unsubscribe", (chat) => {
            socket.leave(chat);
            console.log('Socket listening unsuscribe chatroom leave : ', chat);
        });
    }
}