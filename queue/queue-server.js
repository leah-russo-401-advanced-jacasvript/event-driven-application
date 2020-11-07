'use strict';

const ioClient = require('socket.io-client');
const socket = ioClient('ws://localhost:3000/queue');

socket.on('delivered', payload => {
  socket.emit('delivered', payload);
});