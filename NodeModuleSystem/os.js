const os = require("os");

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// values are in byte to convert it into kb/mb/gb divide by /1024/1024/1024

