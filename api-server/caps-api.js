'use strict';
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const queueServer = io.of('/queue')

server.listen(3000);

app.use(express.json());

app.post('/delivery/:retailer/:code', (req,res)=> {
  queueServer.on('connect', ()=> {
    queueServer.emit('delivered', req.body);
  })
    
})

//POST on /delivery/:retailer/:code