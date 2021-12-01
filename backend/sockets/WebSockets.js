class WebSockets {
    users = [];
    connection(client) {
      client.on("disconnect", () => {
        this.users = this.users.filter((user) => user.socketId !== client.id);
      });
      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });
      });
      client.on("subscribe", (chat, otherUserId = "") => {
        this.subscribeOtherUser(chat, otherUserId);
        client.join(chat);
      });
      client.on("unsubscribe", (chat) => {
        client.leave(chat);
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