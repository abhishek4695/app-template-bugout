const express = require('express');
const app = express();
const port = 3000;

var client = require('./bugout-client.js');

app.use(express.json())

app.get('/', (req, res) => {
  let connected = client.getCon();
  console.log(connected);
  res.send({"connected": connected});
});

app.post('/setAddress', (req, res) => {
  let address = req.body.address;
  console.log(address);
  client.setAddress(address, function(response){
    console.log(response);
    res.send(response);
  });
});

app.post('/rpc', (req, res) => {
  let connected = client.getCon();
  if(connected){
      let pong1 = req.body.num1;
      let pong2 = req.body.num2;
      client.rpcCall(pong1, pong2, function(response){
      console.log(response);
      res.send(response);
    });
  }
  else{
    res.status(400).send(
      {
        "Error":{
          "detail": "Not connected to server, set address first to establish connection"
        }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
