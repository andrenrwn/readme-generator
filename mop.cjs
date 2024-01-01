const inquirer = require("inquirer");
const decamelize = require("decamelize");
const fs = require("fs");

let readmecomponents = {
  description: "",
  toc: "",
  installation: "",
  usage: "",
  license: "",
  contributing: "",
  tests: "",
  questions: "",
};

function generateMD({ description, toc, installation, usage, license, contributing, tests, questions }) {
  let MDsection1 = "";
  let MDsection2 = ""; // sections after table of contents
  let tocsections = [];
  let toccontent = "";

  if (description) {
    MDsection1 += `# Description\n${description}\n\n`;
    tocsections.push("Description");
  }
  if (toc) {
    MDsection1 += `# Table of Contents\n${toc}\n\n`;
    tocsections.push("Table of Contents");
  }
  if (installation) {
    MDsection2 += `# Installation\n${installation}\n\n`;
    tocsections.push("Installation");
  }
  if (usage) {
    MDsection2 += `# Usage\n${usage}\n\n`;
    tocsections.push("Usage");
  }
  if (license) {
    MDsection2 += `# License\n${license}\n\n`;
    tocsections.push("License");
  }
  if (contributing) {
    MDsection2 += `# Contributing\n${contributing}\n\n`;
    tocsections.push("Contributing");
  }
  if (tests) {
    MDsection2 += `# Tests\n${tests}\n\n`;
    tocsections.push("Tests");
  }
  if (questions) {
    MDsection2 += `# Questions\n${questions}\n\n`;
    tocsections.push("Questions");
  }

  for (let i = 0; i < tocsections.length; i++) {
    let linklabel = tocsections[i];
    let link = decamelize(tocsections[i], "-");
    toccontent += `${i} [${linklabel}](#${link})\n\n`;
  }

  return MDsection1 + toccontent + MDsection2;
}

<<<<<<< HEAD
const showMenu = () => {
  const questions = [
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        { name: "action 1", value: "Action1" },
        { name: "action 2", value: "Action2" },
        { name: "Exit program", value: "quit" },
      ],
    },
  ];
  return inquirer.prompt(questions);
};

// Menu loop for pr
// https://stackoverflow.com/questions/61417816/how-do-i-invoke-inquirer-js-menu-in-a-loop-using-promises
let main = async () => {
  let result = {
    action:''
  };
  while (result.action !== "quit") {
    //console.log("\n\n\n");
    result = await showMenu();
    //console.log("result: ", result);

    // .then((answers) => {
    //   console.log("\nResult:\n" + JSON.stringify(answers) + "\n");
    //   result = answers.action;
    // });
  }
};

main();

=======
>>>>>>> 1ed4bd9535f2bd68ddf85e100839e5f0cc2202da
//We need to enter description, toc, installation, usage, license, contributing, tests, questions
inquirer
  .prompt([
    {
      type: "input",
      name: "description",
<<<<<<< HEAD
      message: "\ndescription?\n",
=======
      message: "description?",
>>>>>>> 1ed4bd9535f2bd68ddf85e100839e5f0cc2202da
    },
    {
      type: "input",
      name: "toc",
      message: "toc?",
    },
    {
      type: "input",
      name: "installation",
      message: "installation?",
    },
    {
      type: "input",
      name: "usage",
      message: "usage?",
    },
    {
      type: "input",
      name: "license",
      message: "license?",
    },
    {
      type: "input",
      name: "contributing",
      message: "contributing?",
    },
    {
      type: "input",
      name: "tests",
      message: "tests?",
    },
    {
      type: "input",
      name: "questions",
      message: "questions?",
    },
  ])
  .then((answers) => {
    const READMEContent = generateMD(answers);

    fs.writeFile("READMEcandidate.md", READMEContent, (err) =>
      err ? console.log(err) : console.log("Successfully created READMEcandidate.md!")
    );
  });
