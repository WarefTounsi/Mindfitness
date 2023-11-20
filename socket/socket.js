const { Server } = require("socket.io");
const dotenv = require("dotenv").config();
const port = process.env.port;
const io = new Server(Number(port), {
  cors: {
    origin: "*",
  },
});
console.log("socket running on port", port);
let clients = [];
io.on("connect", (socket) => {
  socket.on("CONNECT", (data) => {
    const clientCheck = clients.find((client) => client?.id === data?.id);
    if (!clientCheck) {
      clients.push(data);
    }
    if (clientCheck) {
      if (!clientCheck.socketID.includes(data?.socketID[0])) {
        clientCheck.socketID.push(data?.socketID[0]);
      }
    }
  });
  socket.on("MESSAGE", (data) => {
    const user = clients.find((client) => client?.id === data?.usertodm?.id);
    if (user) {
      user.socketID.forEach((socketID) =>
        io.to(socketID).emit("MESSAGE", data)
      );
    }
  });
  socket.on('disconnect', (reason) => {
    let disconnectClient = clients.find((client) =>
      client.socketID.includes(socket.id)
    );
    if (disconnectClient) {
      disconnectClient.socketID = disconnectClient?.socketID?.filter(
        (id) => id !== socket.id
      );
    }
  });
});
