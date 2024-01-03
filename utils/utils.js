const fs = require('fs');

// Get open-source licenses (Source: https://api.opensource.org/licenses/ and https://github.com/OpenSourceOrg/licenses)
const licensefile = 'licenses.json';

let inquirer = require("inquirer");

let licenses;
try {
  licenses = JSON.parse(fs.readFileSync(licensefile));
} catch (err) {
  console.log(err);
  // Use inquirer to print prompt before displayAlert() can be used prior to blessed window initialization
  (async () => {
    const answer = await inquirer.prompt([
      {
        type: "error",
        message: "Inquirer Message: Error loading file, please ensure licenses.json exists and in JSON format. Application will now exit",
        name: "answer",
      },
    ]);
    if (!answer) {
      return process.exit(0);
    };
  })();
};


// Note: License badge links follow the following links and format: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
// parameter: license is licenses.id
// Convert all space (' ') or dash ('-') into underscores ('_')If there is no license, return an empty string
function renderLicenseBadge(license) {
  return license.replace(/[- ]/g, '_');
};

// If there is no license, return an empty string
function renderLicenseLink(license) {
  let licElem = licenses.find(elem => {
    elem.id === license;
  });
  if (licElem && licElem.hasOwnProperty('text') && licElem.text.hasOwnProperty('url')) {
    return licElem.text.url;
  } else {
    return ""
  };
};

// TODO: Create a function that returns the license section of README
// Not implemented. Integrated in index.js
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// TODO: Create a function to generate markdown for README
// Not implemented. Integrated in index.js in an array of sections.
function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = { licenses, renderLicenseBadge, renderLicenseLink };
