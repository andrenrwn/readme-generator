import ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import inquirer from "inquirer";

function promptforstuff(inputtype, message, name) {
  return inquirer
    .prompt([
      {
        type: inputtype,
        message: message,
        name: name,
      },
    ])
    .then((response) => {
      return response;
    });
}

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
  //myReadme = generateMD(myReadmeComponents);
  let myReadme = "This is my readme file\n";
  process.stdout.write(chalk.blue("─".repeat((process.stdout.columns || 10) - 2)));
  process.stdout.write(myReadme);
  process.stdout.write(chalk.blue("─".repeat((process.stdout.columns || 10) - 2)));

  //waitKeyPressed();
}

process.stdout.write(ansiEscapes.eraseScreen);
process.stdout.write(ansiEscapes.cursorTo(0, 0));
process.stdout.write(chalk.red("First Question\n"));
process.stdout.write(chalk.yellow("─".repeat((process.stdout.columns || 10) - 1)) + "\n");

displayReadme();

let myanswer = await promptforstuff(
  "input",
  "press enter to continue",
  "answer"
);


process.stdout.write(ansiEscapes.eraseScreen);
process.stdout.write(ansiEscapes.cursorTo(0, 0));
process.stdout.write(chalk.red("Second Question\n"));
process.stdout.write(chalk.yellow("─".repeat((process.stdout.columns || 10) - 1)) + "\n");

displayReadme();

myanswer = await promptforstuff(
  "input",
  "press enter to continue",
  "answer"
);
