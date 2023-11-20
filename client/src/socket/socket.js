const { io } = require("socket.io-client");

export const newSocket = io("http://localhost:7005");
