const EventEmitter = require("events");
// const { url } = require("inspector");
let emitter = new EventEmitter();

// Register a Listner
emitter.on("messageLogged",  (e) => {
  console.log("Listner called", e);
});

// Raise a Event
emitter.emit("messageLogged", {id: 1, url: 'https://'});

