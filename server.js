const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const server = express();


server.use(express.static(path.join(__dirname, 'frontend/build')));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.disable("x-powered-by")

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.post('/api/getImage', (req,res) => {
  const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&lang=en-us&nojsoncallback=1';

  request(url, function(error, response, body) {
    res.json(JSON.parse(body))
  })
});

server.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log('App is listening on port ' + port);
