var WebTorrent = require("webtorrent");
var Bugout = require("bugout");
var wrtc = require("wrtc");

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

var wt = new WebTorrent({tracker: {wrtc: wrtc}});

var address = "bVQBDwhLDHmupSR8iWoXUjSsWFbLCGuV7Z"

// // b.on("announce", console.log.bind(console, "Announced:"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/setAddress',(req,res) =>{
  address = req.body.address;
  res.send({
    "data":{
      "address": address,
      "message": "Address set successfully!"
  }});
});

app.post('/ping', (req, res) => {
  console.log(req.body.address);
  console.log(address);
  var b = Bugout(address, {wt: wt});
  var response = "{empty}";
  console.log("Address:", b.address());
  console.log("Seed:", b.seed);
  console.log("Announcing to trackers...");
  b.on("server", function() {
    // ok, we're connected
    console.log("Connected to the server.");
    // make an RPC API call on the server and log the result
    //b.rpc("ping", {"Hello": "world", "pong": 5},function (data){ log("response:" + data.pong)});
    // watch for {"Hello": "world", "pong": true} in the log below
    // show a simple UI for testing the server API
    b.rpc("ping", {"Hello": "world", "pong": 5},function (data){
      response = data.pong;
      console.log("response:" + data.pong + " " + data)
      res.send("response:" + data.pong);
    });
  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
