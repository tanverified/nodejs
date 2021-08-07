const EventEmitter = require("events");
let emitter = new EventEmitter();

emitter.on("logging", (e) => {
  console.log("UserData :", e);
});

emitter.emit("logging", { username: "tanveer", password: "pass123" });
