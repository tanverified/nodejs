// like window in JavaScript node has global

console.log();

setTimeout();
clearTimeout();

setInterval();
clearInterval();

// all these available at global object
// like global.console.log();

var message = '';

// here message not added to global object
//it has only scope at this file only
// unlike in Javascript it available at window.message

// Node Module Wrapper 

// (function(exports, require, module, __filename, __dirname) {
//     // Module code actually lives in here
//     });