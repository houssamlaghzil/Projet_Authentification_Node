class WebSockets {
    users = [];
    connection(client) {
      console.log("Socket listening someone connect");

      client.on("disconnect", () => {
        this.users = this.users.filter((user) => user.socketId !== client.id);
        console.log('Socket listening user disconnected');
      });

      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });

        console.log('Socket listening identity connection');
      });

      client.on("subscribe", (chat, otherUserId = "") => {
        this.subscribeOtherUser(chat, otherUserId);
        client.join(chat);

        console.log('Socket listening chatroom');
      });

      client.on("unsubscribe", (chat) => {
        client.leave(chat);
        console.log('Socket listening unsuscribe chatroom');
      });
    }
  
    subscribeOtherUser(chat, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);

        if (socketConn) {
          socketConn.join(chat);
        }
      
      });
    }
  }
  
  export default new WebSockets();