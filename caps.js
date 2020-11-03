'use strict';

 const events = require('./event.js');
 const vendor = require('./vendor.js');
 const driver = require('./driver.js')

events.on('pickup', payload => logger('pickup', payload) )
events.on('in-transit',payload => logger('in-transit',payload));
events.on('delivered',payload => logger('delivered',payload));
vendor();

function logger(event,payload) {
  console.log('EVENT',{event,payload})
}

