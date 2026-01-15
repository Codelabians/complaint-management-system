// src/services/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.60:3001";

let socket = null;

export const initSocket = (token, userId) => {
  console.log(userId);
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    // withCredentials: true,
    // reconnection: true,
    // reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
    if (userId) {
      socket.emit("register", userId);
    }
    if (!userId) {
      console.log("User ID not found");
    }
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
