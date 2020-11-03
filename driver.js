'use strict';

const events = require('./event.js');
events.on('pickup', handlePickup);

function handlePickup(payload) {
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit('in-transit',payload)
  }, 1000)
}

events.on('in-transit', deliverHandler);

function deliverHandler(order) {
  setTimeout(()=> {
    console.log(`DRIVER: delivered ${order.orderID}`);
    events.emit('delivered',order);
  }, 3000);
}

