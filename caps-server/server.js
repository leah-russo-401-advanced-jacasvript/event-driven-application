'use strict';

const net = require('net');
//require('dotenv').config();
const port = 3000;

const server = net.createServer();

server.listen(port, () => {
  console.log( `server running on port ${port}`)
})

let socketPool = {};

// Convert these event listeners to the socket thingies:
//events.on('pickup', payload => logger('pickup', payload) )
//events.on('in-transit',payload => logger('in-transit',payload));
//events.on('delivered',payload => logger('delivered',payload));

server.on('connection', (socket) => {
  const id = `Socket-${Math.random}`;
  socketPool[id] = socket;

  socket.on('data', buffer => dispatch(buffer));
  socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
  socket.on('end', (e) => { delete socketPool[id]; });
});

server.on('error', (e) => {
  console.error('SERVER ERROR', e.message);
});

function dispatch(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  broadcast(message)
}

function broadcast(message) {
  let object = {'event': message.event, payload: message.payload};
  let payload = JSON.stringify(object);
  console.log(payload);
  for(let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}

