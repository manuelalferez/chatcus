const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());

io.on("connection", (socket) => {
    socket.on("join", ({ name, room, pfpSrc }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room, pfpSrc });

        if (error) {
            return callback(error);
        }

        const roommates = getUsersInRoom(user.room);

        socket.join(user.room);
        socket.emit("message", {
            user: "admin",
            text: `${user.name} welcome to the room ${user.room}`,
            roommates,
        });

        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined!`,
            roommates,
        });
        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", {
            user: user.name,
            text: message,
            pfpSrc: user.pfpSrc,
        });
        callback();
    });

    socket.on("sendTyping", (typing, callback) => {
        const user = getUser(socket.id);
        console.log(user.name, typing);
        io.to(user.room).emit("typing", {
            user: user.name,
            typing: typing,
        });
    });

    const leaveRoom = () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has left`,
                roommates: getUsersInRoom(user.room),
            });
        }
    };

    socket.on("leave", leaveRoom);

    socket.on("disconnect", leaveRoom);
});

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
