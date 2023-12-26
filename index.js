// TODO: Include packages needed for this application
import inquirer from "inquirer";
import editor from "@inquirer/editor";
import select, { Separator } from "@inquirer/select";
// Get a list of open source licenses
// https://api.opensource.org/licenses/

// TODO: Create an array of questions for user input
const questions = [];

// const answer = await editor({
//   message: "Enter a description",
// });

//import select, { Separator } from "@inquirer/select";

function promptmeforstuff() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your user name?",
        name: "username",
      },
      {
        type: "password",
        message: "What is your password?",
        name: "password",
      },
      {
        type: "password",
        message: "Re-enter password to confirm:",
        name: "confirm",
      },
    ])
    .then((response) =>
      response.confirm === response.password
        ? console.log("Success!")
        : console.log("You forgot your password already?!")
    );
}

function selectstuff() {
  inquirer
    .select({
      message: "This is a README markdown generator. Select what you want to do:",
      choices: [
        {
          name: "title",
          value: "title",
          description: "Define the title of your application",
        },
        {
          name: "license",
          value: "license",
          description: "Choose or create the license for your program",
        },
        {
          name: "edit",
          value: "edit",
          description: "Edit the text for your README",
        },
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
        new Separator(),
        {
          name: "image",
          value: "image",
          description: "Select an image to display in your README file",
          disabled: true,
        },
        {
          name: "analyze",
          value: "analyze",
          description: "Feed your program into generative AI to describe it",
          disabled: true,
        },
      ],
    })
    .then((response) => {
      console.log("Selected: ", response);
    });
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
  //promptmeforstuff();
  selectstuff();
}

// Function call to initialize app
init();

