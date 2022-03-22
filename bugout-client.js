var WebTorrent = require("webtorrent");
var Bugout = require("bugout");
var wrtc = require("wrtc");

var wt = new WebTorrent({tracker: {wrtc: wrtc}});

var connected = false;

exports.getBugout = function(){
  return this;
}

var b = null;

exports.setAddress = function(address, callback){
  b = Bugout(address, {wt: wt});
  console.log("Address:", b.address());
  console.log("Seed:", b.seed);
  console.log("Announcing to trackers...");
  b.on("server", function() {
    // ok, we're connected
    console.log("Connected to the server.");
    connected = true;
    // make an RPC API call on the server and log the result
    b.rpc("ping", {"Hello": "world", "pong": 5},function (data){
      console.log("response:" + data.pong);
      callback({"response": data.pong, "connected": connected});
    });
  });
}


exports.getCon = function(){
  return connected;
}

exports.rpcCall = function(pong1, pong2, callback){
  b.rpc("pong", {"requestTime": Date.now(), "pong": 5, "pong1": pong1, "pong2": pong2, "responseTime": 0}, function (data){
    console.log(data.pong + " " + data.responseTime);
    callback({"response": data.pong, "connected": connected, "responseTime": data.responseTime});
  });
}
