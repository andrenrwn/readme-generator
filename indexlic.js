const fs = require('fs');
let licenses = {};

// Return the contents of 'data.csv' as a string in the variable "data"
// "utf8" encodes the raw buffer data in human-readable format
licenses = JSON.parse(fs.readFileSync('licenses.json'));

console.log("LICENSES:", licenses, "END LICENSES");