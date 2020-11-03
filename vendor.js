'use strict';

const events = require('./event.js');

// function courtesy of Bryant, who got it from the 'interwebs'
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

const store = new Store('me','testStore','somePlace')

function handlePickup() {
  setInterval( () => {
    events.emit('pickup', store);
  }, 5000)
}

events.on('delivered', deliveryHandler );

function deliveryHandler(order) {
  setTimeout(()=> {
    console.log(`Thank you for delivering ${order.orderID}`);
  },1000)
}

module.exports = handlePickup;