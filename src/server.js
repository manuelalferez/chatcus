var app = require("express")();
var http = require("http"); 
var server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 8080;
const STATIC_CHANNELS = ["global_notifications", "global_chat"];

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
  console.log("new client connected");
  socket.emit('connection', null);
});
