'use strict';

// const net = require('net');
// const client = new net.Socket();
// const { getuid, geteuid } = require('process');

// const host = 'localhost';
// const port = 3000;

/////// new server /////////////

const ioClient = require('socket.io-client');
const socket = ioClient('ws://localhost:3000/vendor');

socket.on('connect', ()=> {
  setInterval(()=> {
    socket.emit('pickup', store)
  }, 5000)
})

socket.on('delivered', (payload)=> {
  console.log(`thank you for delivering order ${payload.orderID}`);
})

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

class Store {
  constructor(name,store,address) {
    this.customerName = name;
    this.time = new Date();
    this.orderID = uuidv4();
    this.address = address;
    this.storeName = store;
  }
}

const store = new Store('me','testStore','somePlace');


// client.connect(port,host, ()=> { 
//   console.log('vendor is running')
// });


// const message = JSON.stringify({event: 'pickup', payload: store});

// 

// client.on('data', data=> {
//   let parser = JSON.parse(data);
//   if(parser.event === 'delivered') {
//     let thankYou = json.stringify({event: 'Thank you', payload: `Thank you for delivering ${parser.payload.orderID}`});
//     client.write(thankYou);
//   }
// })



//FROM DEMO:
// function sendMessage(text) {
//   console.log('sending', text);
//   let message = `[${name}]: ${text}`;
//   let event = JSON.stringify({ event: 'message', payload: message });
//   client.write(event);
// }
