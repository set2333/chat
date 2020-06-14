const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const TYPES_MESSAGE = require('./consts/typesMessage');

const port = process.argv[2] || 8080;
const users = [];
let lastId = 0;

function sendMessage(socket, message, type) {
  socket.emit('getMessage', JSON.stringify({ message, id: socket.id, type }));
}

function sendMessageAll(message, id) {
  users.forEach(socket => sendMessage(
    socket,
    message,
    socket.id === id ? TYPES_MESSAGE.HIS : TYPES_MESSAGE.MESSAGE));
}

function sendMessageAllInfo(message) {
  users.forEach(socket => sendMessage(
    socket,
    message,
    TYPES_MESSAGE.INFO));
}

function sendMessageOtherUsers(message, id) {
  users
    .filter(({ id: userId }) => id !== userId)
    .forEach(socket => sendMessage(
      socket,
      message,
      TYPES_MESSAGE.INFO));
}

io.on('connection', (socket) => {
  socket.name = `User ${users.length + 1}`;
  socket.id = lastId;
  lastId += 1;
  users.push(socket);
  socket.emit('getName', JSON.stringify({ name: socket.name, id: socket.id }));
  sendMessage(socket, `Hello ${socket.name}! Welcome to best chat!`, TYPES_MESSAGE.INFO);
  sendMessageOtherUsers(`Added user: ${socket.name}`, socket.id);

  socket.on('setName', (response) => {
    try {
      const { name } = JSON.parse(response);
      const oldName = socket.name;
      socket.name = name;
      sendMessageAllInfo(`${oldName} changed name to ${name}`);
      socket.emit('getName', JSON.stringify({ name, id: socket.id }));
    } catch {
      sendMessage(socket, 'error rename', TYPES_MESSAGE.ERROR);
    }
  });

  socket.on('sendMessage', (response) => {
    const { message } = JSON.parse(response);
    sendMessageAll(`${socket.name}: ${message}`);
  });

  socket.on('disconnect', () => {
    sendMessageOtherUsers(`${socket.name} exit`, socket.id);
    users.slice(users.find(({ id }) => id === socket.id), 1);
  });
});

app.use(express.static(`${__dirname }/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname }/public/index.html`);
});

http.listen(port);
