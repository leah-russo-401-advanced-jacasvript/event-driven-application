'use strict';
const express = require('express');
//const { Socket } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
//const io = require('socket.io')(server);
const io = require('socket.io-client');
//const queueServer = io.of('/queue')

server.listen(3001);

app.use(express.json());

// app.post('/delivery/:retailer/:code', (req,res)=> {
//   queueServer.on('connect', ()=> {
//     queueServer.emit('delivered', req.body);
//   })
    
// })

//POST on /delivery/:retailer/:code

//demo:

const socket = io.connect('http://localhost:3000')


app.post('/delivery/:storeId/:code', (req,res,next)=> {
  const { storeId, code } = req.params;
  console.log(req.params.storeId)
  socket.emit('delivered', {
    store: storeId,
    code: code
  })

  res.send(`Order for store ${storeId} with order number ${code} was delivered`)
})

