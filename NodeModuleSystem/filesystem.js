const fs = require("fs");

// let files = fs.readdirSync('./')
// console.log(files);

fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log(files);
});
