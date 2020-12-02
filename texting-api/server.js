const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config.env' });
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUsers, removeUser, getUsers, getUserInRoom } = require('./Users.js');
const PORT = process.env.PORT || 5000;
const router = require('./router.js');
const Room = require('./RoomModel');
app.use(express.json());

app.use(
  cors({
    // origin: "https://justrelax-ce045.firebaseapp.com",
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(router);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('private', async ({ name, room, password }, callback) => {
    try {
      const r = await Room.find({ room: room });
      console.log(r);
      if (!r) throw new Error('some error');
      if (password && password === r[0].password) {
        const { error, user } = addUsers({ id: socket.id, name, room });
        if (error) return callback(error);
        //console.log(user);
        socket.join(user.room);
        socket.emit('message', {
          user: user,
          text: `${user.name} welcome to the room ${user.room}`,
        });
        socket.broadcast
          .to(user.room)
          .emit('message', { user: user, text: `${user.name} joined` });
        console.log(name, room);
      } else throw new Error('some error');
    } catch (er) {
      socket.emit('err', { message: 'Incorrect room name or password' });
    }
  });
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, name, room });
    if (error) return callback(error);
    //console.log(user);
    socket.join(user.room);
    socket.emit('message', {
      user: user,
      text: `${user.name} welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: user, text: `${user.name} joined` });
    console.log(name, room);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUsers(socket.id);
    if (user) {
      console.log(user, message, 'Sending message');
      socket.broadcast
        .to(user.room)
        .emit('message', { user: user, text: message });
    }
    callback();
  });
  socket.on('sendImage', (message, callback) => {
    const user = getUsers(socket.id);
    if (user) {
      console.log(user, 'message', 'sending image');
      socket.broadcast
        .to(user.room)
        .emit('image', { user: user, image: message });
    }
    callback();
  });
  socket.on('sendAudio', (message, callback) => {
    const user = getUsers(socket.id);
    console.log(user);
    if (user) {
      console.log(user, message, 'Sending audio');
      socket.broadcast
        .to(user.room)
        .emit('audio', { user: user, audio: message });
    }
    // callback();
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: user,
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUserInRoom(user.room),
      });
    }
  });
});

app.post('/room', async (req, res, next) => {
  console.log(req.body);
  const { room, password } = req.body;
  console.log(room, password, 'values');
  try {
    const r = await Room.create({ room, password });
    res.status(200).json({
      status: 'success',
      room: r,
    });
  } catch (er) {
    console.log(er);
    res.status(404).json({
      status: 'fail',
      error: 'something went wrong',
    });
  }
});

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,

    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((p, er) => {
    if (er) console.log(er);
    else console.log('db connected');
  });
server.listen(PORT, () => {
  console.log(`Server opened Sucessfully on ${PORT}`);
});
