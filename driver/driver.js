'use strict';

const net = require('net');

const client = new net.Socket();

const port = 3000;
const host = 'localhost'

client.connect(port,host,()=> console.log(`connected to driver on port ${port} on host ${host}`));

client.on('data', data => {
  let parsed  = JSON.parse(data);
  if(parsed.event === 'pickup') {
    console.log(parsed)
    let obj = {event: 'DRIVER', payload: `picked up ${parsed.payload.orderID}`};
    let message = JSON.stringify(obj);

    setTimeout( ()=> {
      client.write(message);
      parsed.event = 'in-transit'
      let obj = JSON.stringify(parsed)
      client.write(obj);
    }, 1000 );

    
  }
      if(parsed.event === 'in-transit'){
        let obj = {event: 'DRIVER', payload: `delivered up ${parsed.payload.orderID}`};
    let message = JSON.stringify(obj);

    setTimeout( ()=> {
      client.write(message);
      parsed.event = 'delivered'
      let obj = JSON.stringify(parsed)
      client.write(obj);
    }, 3000 );
  }
})
