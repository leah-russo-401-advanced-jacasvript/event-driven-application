'use strict';
//////////////////// olds server ////////////////
// const net = require('net');
// //require('dotenv').config();
// const port = 3000;

// const server = net.createServer();

// server.listen(port, () => {
//   console.log( `server running on port ${port}`)
// })

///////////////////////////////////////////////////
//new server:

const io = require('socket.io');
const server = io(3000);
const vendorServer = server.of('/vendor');
const driverServer = server.of('/driver');

let queue = {
  pickup: {},
  inTransit: {},
  delivered: {}
}

server.on('connection', (socket) => {
  console.log(`${socket.id} has connected`)
  socket.on('delivered', payload => {
    console.log('i have arrived')
    delete queue.inTransit[payload.orderID];
    queue.delivered[payload.orderID] = payload;
    console.log(`event`, {event: 'delivered', payload: payload})
  
    vendorServer.emit('delivered', payload)
  
  })

})

vendorServer.on('connection', socket => {
  socket.on('pickup', payload => {

    queue.pickup[payload.orderID] = payload;
    console.log(`event`, {event: 'pickup', payload: payload});

   driverServer.emit('pickup', payload);
  })
})

driverServer.on('connection', socket => {
  socket.on('in-transit', payload => {
    delete queue.pickup[payload.orderID];
    queue.inTransit[payload.orderID] = payload;
    console.log(`event`, {event: 'in-transit', payload: payload})

  driverServer.emit('in-transit', payload);
  })

})



//let socketPool = {};

// Convert these event listeners to the socket thingies:
//events.on('pickup', payload => logger('pickup', payload) )
//events.on('in-transit',payload => logger('in-transit',payload));
//events.on('delivered',payload => logger('delivered',payload));

// server.on('connection', (socket) => {
//   const id = `Socket-${Math.random}`;
//   socketPool[id] = socket;

//   socket.on('data', buffer => dispatch(buffer));
//   socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
//   socket.on('end', (e) => { delete socketPool[id]; });
// });

// server.on('error', (e) => {
//   console.error('SERVER ERROR', e.message);
// });

// function dispatch(buffer) {
//   let message = JSON.parse(buffer.toString().trim());
//   broadcast(message)
// }

// function broadcast(message) {
//   let object = {'event': message.event, payload: message.payload};
//   let payload = JSON.stringify(object);
//   console.log(payload);
//   for(let socket in socketPool) {
//     socketPool[socket].write(payload);
//   }
// }

