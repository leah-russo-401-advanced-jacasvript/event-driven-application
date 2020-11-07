'use strict';


const ioClient = require('socket.io-client');
const socket = ioClient('ws://localhost:3000/driver');
const superagent = require('superagent');

// demo:
//const socket = io.connect('http://localhost:3000')

socket.on('pickup', payload => {
  console.log(`picked up ${payload.orderID}`);
  
  setTimeout( ()=> {
    socket.emit('in-transit', payload)
  }, 1000)
})

socket.on('in-transit', async (payload) => {
  console.log(`delivered order ${payload.orderID}`);
  try {
    const req = await superagent.post(`http://localhost:3001/delivery/${payload.storeName}/${payload.orderID}`)
    //console.log(req.body);
    
  } catch (error) {
    console.log(error)
  }

  // setTimeout( ()=> {
  //   socket.emit('delivered', payload);
  // }, 2000);
})

// const net = require('net');

// const client = new net.Socket();

// const port = 3000;
// const host = 'localhost'

// client.connect(port,host,()=> console.log(`connected to driver on port ${port} on host ${host}`));

// client.on('data', data => {
//   let parsed  = JSON.parse(data);
//   if(parsed.event === 'pickup') {
//     console.log(parsed)
//     let obj = {event: 'DRIVER', payload: `picked up ${parsed.payload.orderID}`};
//     let message = JSON.stringify(obj);

//     setTimeout( ()=> {
//       client.write(message);
//       parsed.event = 'in-transit'
//       let obj = JSON.stringify(parsed)
//       client.write(obj);
//     }, 1000 );

    
//   }
//       if(parsed.event === 'in-transit'){
//         let obj = {event: 'DRIVER', payload: `delivered up ${parsed.payload.orderID}`};
//     let message = JSON.stringify(obj);

//     setTimeout( ()=> {
//       client.write(message);
//       parsed.event = 'delivered'
//       let obj = JSON.stringify(parsed)
//       client.write(obj);
//     }, 3000 );
//   }
// })
