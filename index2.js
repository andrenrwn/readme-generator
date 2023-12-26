import inquirer from "inquirer";
import select, { Separator } from "@inquirer/select";
import ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import fs from "fs";

// Get a list of open source licenses
// https://api.opensource.org/licenses/

let myReadmeFileName = "README.generated.md";

// README data
let myReadme = "";

// README object components
let myReadmeComponents = {
  title: "",
  description: "",
  installation: "",
  usage: "",
  license: "",
  contributing: "",
  tests: "",
  questions: "",
};

// Create README data from README object components
function generateMD({ title, description, installation, usage, license, contributing, tests, questions }) {
  let MDsection1 = "";
  let MDsection2 = ""; // sections after table of contents
  let tocsections = [];
  let toccontent = "";

  if (title) {
    MDsection1 += `# ${title}\n\n`;
  }
  if (description) {
    MDsection1 += `# Description\n${description}\n\n`;
    tocsections.push("Description");
  }
  MDsection1 += `# Table of Contents\n\n`;
  tocsections.push("Table of Contents");
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
    let link = tocsections[i].replace(/\s+/g, "-");
    toccontent += `${i} [${linklabel}](#${link})\n\n`;
  }

  return MDsection1 + toccontent + MDsection2;
}

async function promptforstuff(inputtype, message, name) {
  let answer = await inquirer.prompt([
    {
      type: inputtype,
      message: message,
      name: name,
    },
  ]);
  console.log("inside function answer: ", answer)
  return answer;
  // .prompt([
  //   {
  //     type: inputtype,
  //     message: message,
  //     name: name,
  //   },
  // ])
  // .then((response) => {
  //   console.log(response);
  //   return response;
  // });
}

function selectstuff(choices) {
  return;
}

// description: "",
// installation: "",
// usage: "",
// license: "",
// contributing: "",
// tests: "",
// questions: "",

// Menu loop
async function menu() {
  // Define menu selections
  let choices = [
    {
      name: "display",
      value: "display",
      description: "Display current README content",
    },
    new Separator(), // common sections in README files
    {
      name: "title",
      value: "title",
      description: "Enter the title of your application",
    },
    {
      name: "description",
      value: "description",
      description: "Enter a description of your project",
    },
    {
      name: "installation",
      value: "installation",
      description: "Document how users can install your application",
    },
    {
      name: "usage",
      value: "usage",
      description: "Document how your application is used",
    },
    {
      name: "license",
      value: "license",
      description: "Choose or create the license for your application",
    },
    {
      name: "contributing",
      value: "contributing",
      description: "Enter guidelines on contributing to this project",
    },
    {
      name: "tests",
      value: "tests",
      description: "Enter testing details",
    },
    {
      name: "questions",
      value: "questions",
      description: "Enter frequently asked questions",
    },
    new Separator(), // uncommon sections
    {
      name: "repository",
      value: "repository",
      description: "Specify your Github repository",
    },
    {
      name: "logo",
      value: "logo",
      description: "Specify a logo for your application",
    },
    {
      name: "dependencies",
      value: "dependencies",
      description: "Read the dependencies of your application from package.json",
    },
    {
      name: "section",
      value: "section",
      description: "Add a section to your README file",
    },
    new Separator(),
    {
      name: "edit",
      value: "edit",
      description: "Edit the text for your README",
    },
    {
      name: "reset",
      value: "reset",
      description: "Reset your README",
    },
    {
      name: "save",
      value: "save",
      description: "Save your work into a file",
    },
    {
      name: "quit",
      value: "quit",
      description: "Quit this program",
    },
    // new Separator(),
    // {
    //   name: "image",
    //   value: "image",
    //   description: "Select an image to display in your README file",
    //   disabled: true,
    // },
    // {
    //   name: "analyze",
    //   value: "analyze",
    //   description: "Feed your program into generative AI to describe it",
    //   disabled: true,
    // },
  ];

  let answer;
  while (answer !== "quit") {
    process.stdout.write(ansiEscapes.eraseScreen);
    process.stdout.write(ansiEscapes.cursorTo(0, 0));
    process.stdout.write(chalk.yellow("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
    //answer = await selectstuff(choices);
    answer = await select({
      message: "Select what you want to do:\n",
      choices: choices,
      pageSize: choices.length,
      loop: true,
    });
    console.log("Selected: ", answer);

    let enterkeypress = await promptforstuff("input", "press enter to continue", "answer");

    // answer = await select({
    //   message: "This is a README markdown generator. Select what you want to do:\n",
    //   choices: choices,
    //   pageSize: choices.length,
    //   loop: true,
    // }).then((response) => {
    //   console.log("Selected: ", response);
    //   return response;
    // });
    // console.log("ANSWER:", answer);
    //process.stdout.write(ansiEscapes.eraseScreen);
    //process.stdout.write(ansiEscapes.cursorTo(0, 0));
    //console.log("ANSWER:", answer);
    //process.stdout.write(ansiEscapes.cursorTo(0, 1));
    //process.stdout.write(ansiEscapes.eraseDown);
    //process.stdout.write(ansiEscapes.cursorTo(0, 2));
    switch (answer) {
      case "display":
        process.stdout.write(ansiEscapes.eraseScreen);
        process.stdout.write(ansiEscapes.cursorTo(0, 0));
        process.stdout.write(chalk.red("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
        await displayReadme();
        break;
      case "title":
      case "description":
      case "installation":
      case "usage":
      case "license":
      case "contributing":
      case "tests":
      case "questions":
        // console.log(
        //   "prompting ",
        //   choices.find((element) =>
        //     {return element.name === answer;},
        //     "answer ",
        //     answer)
        // );
        // Dispatch inquirer prompt based on selected menu item
        process.stdout.write(ansiEscapes.eraseScreen);
        process.stdout.write(ansiEscapes.cursorTo(0, 0));
        process.stdout.write(chalk.red("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
        if (myReadmeComponents[answer].length > 0) {
          process.stdout.write(myReadmeComponents[answer] + "\n");
          process.stdout.write(chalk.red("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
        }
        let myanswer = await promptforstuff(
          "input",
          choices.find((element) => {
            return element.name === answer;
          }).description + "\n",
          answer
        );
        myReadmeComponents[answer] = myanswer[answer];
        // console.log(myReadmeComponents[answer]);
        break;
      case "save":
        process.stdout.write(ansiEscapes.eraseScreen);
        process.stdout.write(ansiEscapes.cursorTo(0, 0));
        process.stdout.write(chalk.red("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
        let filename = await promptforstuff(
          "input",
          `Please enter a filename to save to (default: ${myReadmeFileName}):\n`,
          answer
        );
        myReadme = generateMD(myReadmeComponents);
        if (filename.length > 0) {
          writeToFile(myfilename, myReadme);
        } else {
          writeToFile(myReadmeFileName, myReadme);
        }
        await promptforstuff("input", "press enter to continue", "answer");
        break;
      default:
    }
  }
}

//var xvar = 0;

function waitKeyPressed() {
  return new Promise((resolve) => {
    const wasRaw = process.stdin.isRaw;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once("data", (data) => {
      process.stdin.pause();
      process.stdin.setRawMode(wasRaw);
      resolve(data.toString());
    });
  });
}

async function displayReadme() {
  myReadme = generateMD(myReadmeComponents);
  process.stdout.write(chalk.blue("─".repeat((process.stdout.columns || 10) - 1)) + "\n");
  process.stdout.write(myReadme);
  process.stdout.write(chalk.blue("─".repeat((process.stdout.columns || 10) - 1)) + "\n");

  //prompt for enter
  let enterkeypress = await promptforstuff("input", "press enter to continue", "answer");
  //waitKeyPressed();
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, myReadme);
}

// TODO: Create a function to initialize app
function init() {
  menu();
}

// Function call to initialize app
init();
