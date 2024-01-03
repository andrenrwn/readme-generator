// --------------------------------------------------------------------
// This is a readme generator
// Dependencies:
//   blessed
// Install:
//   $npm install
//   $npm run start
//
// Usage:
// Use the options to enter readme components
// --------------------------------------------------------------------
const fs = require('fs');

const { licenses } = require('./utils/utils');

// global config
let config = {
    email: '',
    githubusername: '',
    readmefileame: 'README.new.md',
    tempsavefilename: 'readmegenerator.json'
}

// Use inquirer in utils/utils.js
// let inquirer = require("inquirer");

/* Move this part of the fixed licenses data code to utils/utils.js
// Get open-source licenses (Source: https://api.opensource.org/licenses/ and https://github.com/OpenSourceOrg/licenses)
let licenses;
try {
    licenses = JSON.parse(fs.readFileSync('licenses.json'));
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
    // displayAlert(err); // cannot use this before initialization
};

// Note: License badge links follow the following links and format: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
 */

// set license data to two arrays: the popular list and the full list
let licensearray = [['Identifier', 'License', 'Popular', 'Permissive']];
let licensearray_full = [['Identifier', 'License', 'Popular', 'Permissive', 'Discouraged', 'Non-reusable', 'Osi-approved']];
// Add license items into array to feed to blessed listTable
licenses.forEach(elem => {
    licensearray_full.push([
        elem.id,
        elem.name,
        elem.keywords.includes('popular') ? "yes" : "",
        elem.keywords.includes('permissive') ? "yes" : "",
        elem.keywords.includes('discouraged') ? "yes" : "",
        elem.keywords.includes('non-reusable') ? "yes" : "",
        elem.keywords.includes('osi-approved') ? "yes" : "",
    ]);
    if (!elem.keywords.includes('discouraged')) {
        licensearray.push([elem.id, elem.name, elem.keywords.includes('popular') ? "yes" : "", elem.keywords.includes('permissive') ? "yes" : ""]);
    };
});

// Use blessed or its fork neo-blessed
let blessed = require("blessed");
let screen = new blessed.screen();

// const blessed = require('neo-blessed');   // you can use the newer 'neo-blessed' or 'blessed' depending on your preference
// let screen = new blessed.screen();

contrib = require('blessed-contrib');


const readmetemplate = {
    title: {
        name: "Title",
        value: false,
        description: "The Title of this Application",
    },
    // logo: {
    //     name: "Logo",
    //     value: false,
    //     description: "A logo for this application"
    // },
    description: {
        name: "Description",
        value: true,
        description: "A description of this project"
    },
    repository: {
        name: "Repository",
        value: false,
        description: "A list of repositories where you can get this application, (ie. GitHub)"
    },
    installation: {
        name: "Installation",
        value: true,
        description: "How to install this application"
    },
    usage: {
        name: "Usage",
        value: true,
        description: "How this application is used"
    },
    contributing: {
        name: "Contributing",
        value: true,
        description: "Guidelines on contributing to this project"
    },
    tests: {
        name: "Testing",
        value: true,
        description: "Testing details"
    },
    questions: {
        name: "Questions",
        value: true,
        description: "Frequently Asked Questions"
    },
    license: {
        name: "License",
        value: true,
        description: "License applicable to this application"
    },
    dependencies: {
        name: "Dependencies",
        value: false,
        description: "Dependencies of this application, from package.json"
    },
    section: {
        name: "Section",
        value: false,
        description: "A custom section for this README"
    },
};

// Define the global and editable readmeContent
let readmeContent = structuredClone(readmetemplate);

function generateReadme() {
    let readmeString = "";

    readmeString += `# ${readmeContent.title.description}\n\n`;

    readmeString += '## Table of Contents\n\n';

    // Add Table of Contents (exluding disabled sections)
    Object.keys(readmeContent).forEach(elem => {
        if (readmeContent[elem].value) {
            readmeString += `- [${readmeContent[elem].name}](#${readmeContent[elem].name})\n`;
        };
    });
    readmeString += '\n\n';

    // Add section contents (excluding disabled sections)
    Object.keys(readmeContent).forEach(elem => {
        if (readmeContent[elem].value) {
            readmeString += `## ${readmeContent[elem].name}\n\n${readmeContent[elem].description}\n\n`;
        };
    });
    readmeString += '\n\n';

    return readmeString;
};

// List of open source licenses: https://api.opensource.org/licenses/

// Parent desktop container
const desktop = blessed.box({
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    content: 'Main box container',
    tags: true,
    style: {
        fg: 'black',
        bg: 'white'
    }
});

// Right side box - displays constructed README
// const box = blessed.box({
const box = contrib.markdown({
    top: '2',
    right: '0',
    width: '65%',
    height: '100%-2',
    content: generateReadme(),
    tags: true,
    shadow: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
        style: {
            bg: 'yellow'
        }
    },
    keys: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'black',
        border: {
            fg: '#f0f0f0'
        },
        focus: {
            border: {
                fg: 'black',
                bg: 'white'
            }
        },
        hover: {
            bg: 'red'
        }
    }
});

class Separator {
    constructor() {
        this.name = "------------------"
        this.value = "------------------"
        this.description = "------------------"
    };
};

// Menu Choices in inquirer format
let choices = [
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
    // {
    //     name: "logo",
    //     value: "logo",
    //     description: "Specify a logo for your application",
    // },
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
        name: "select license",
        value: "select license",
        description: "Select a license from a list of Open Source Licenses",
    },
    {
        name: "select license full",
        value: "select license full",
        description: "Select a license from a list of Open Source Licenses, including all licenses",
    },
    {
        name: "populate dependencies",
        value: "populate dependencies",
        description: "Populate dependencies from package.json",
    },
    {
        name: "add github username",
        value: "add github username",
        description: "Edit the text for your README",
    },
    {
        name: "add e-mail",
        value: "add e-mail",
        description: "Edit the text for your README",
    },
    new Separator(), // common sections in README files
    {
        name: "refresh display",
        value: "refresh display",
        description: "Refresh the current README content on the left box",
    },
    // {
    //     name: "edit",
    //     value: "edit",
    //     description: "Edit the text for your README",
    // },
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
];

let flatchoices = choices.map((elem) => {
    return elem.name;
});

// -----------------------------------------------------------------------
// Side Menu. This is the main menu.
// -----------------------------------------------------------------------
const sideMenu = blessed.list({
    parent: desktop, // Can't capture events if we use screen.append(sideMenu)
    left: '0',
    top: '2',
    height: '100%-2',
    width: '35%',
    keys: true,
    items: flatchoices,
    shadow: true,
    border: {
        type: 'line'
    },
    style: {
        shadow: true,
        fg: 'white',
        bg: 'black',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            fg: 'black',
            bg: 'yellow'
        },
        focus: {
            border: {
                fg: 'black',
                bg: 'white'
            }
        },
        selected: { bg: 'blue' },
        item: { fg: 'yellow' }
    }
});

// -----------------------------------------------------------------------
// Form window. This is where the user edits sections.
// -----------------------------------------------------------------------
const formwindow = blessed.form({
    top: '2',
    right: '0',
    width: '65%',
    height: '100%-2',
    content: '{bold}Form Window{/bold}',
    tags: true,
    shadow: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
        style: {
            bg: 'yellow'
        }
    },
    keys: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'yellow',
        bg: 'blue',
        border: {
            fg: '#f0f0f0'
        },
        focus: {
            border: {
                fg: 'black',
                bg: 'white'
            }
        },
        hover: {
            bg: 'red'
        }
    }
});

// Section title input
var formsectiontitle = blessed.textbox({
    parent: formwindow,
    name: 'title',
    top: 2,
    left: 0,
    height: 3,
    inputOnFocus: true,
    style: {
        focus: {
            border: {
                fg: 'black',
                bg: 'white'
            }
        },
    },
    border: {
        type: 'line',
    }
});

// Section body text are editor
var formsectioneditor = blessed.textarea({
    parent: formwindow,
    name: 'editor',
    top: 5,
    left: 0,
    bottom: 4,
    inputOnFocus: true,
    style: {
        focus: {
            border: {
                fg: 'black',
                bg: 'white'
            }
        },
    },
    border: {
        type: 'line',
    }
});

// Form Submit/Cancel buttons
var formsubmit = blessed.button({
    parent: formwindow,
    name: 'submit',
    content: 'Submit',
    bottom: 0,
    left: 1,
    shrink: true,
    padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
    },
    style: {
        bold: true,
        fg: 'white',
        bg: 'green',
        focus: {
            inverse: true
        }
    }
});
// Cancel button
var formcancel = blessed.button({
    parent: formwindow,
    name: 'cancel',
    content: 'Cancel',
    bottom: 0,
    left: 13,
    shrink: true,
    padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
    },
    style: {
        bold: true,
        fg: 'white',
        bg: 'red',
        focus: {
            inverse: true
        }
    }
});
// Reset/clear form data
var formreset = blessed.button({
    parent: formwindow,
    name: 'reset',
    content: 'Clear',
    bottom: 0,
    left: 25,
    shrink: true,
    padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
    },
    style: {
        bold: true,
        fg: 'white',
        bg: 'red',
        focus: {
            inverse: true
        }
    }
});
// Populate form data to default values
var formdefault = blessed.button({
    parent: formwindow,
    name: 'default',
    content: 'Erase to Default',
    bottom: 0,
    left: 36,
    shrink: true,
    padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
    },
    style: {
        bold: true,
        fg: 'white',
        bg: 'red',
        focus: {
            inverse: true
        }
    }
});
// Checkbox to indicate if section is enabled
var formenabledcheckbox = blessed.checkbox({
    parent: formwindow,
    name: 'enabled',
    content: 'Enabled',
    bottom: 0,
    right: 2,
    shrink: true,
    padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
    },
    style: {
        bold: true,
        fg: 'white',
        bg: 'black',
        focus: {
            inverse: true
        }
    }
});


// Form Event management
// submit form
formsubmit.on('press', function () {
    formwindow.submit();
});
// Cancel and return to menu
formcancel.on('press', function () {
    formwindow.reset();
    formwindow.hide();
    sideMenu.focus();
    screen.render();
});
// clear all form entries
formreset.on('press', function () {
    formwindow.reset();
    screen.render();
});
// erase all form entries and set them to default
formdefault.on('press', function () {
    formwindow.reset();
    formsectiontitle.setValue(readmetemplate[formwindow.data.sectionbeingedited].name);
    formsectioneditor.setValue(readmetemplate[formwindow.data.sectionbeingedited].description);
    formsectiontitle.render();
    formsectioneditor.render();
    screen.render();
});

formwindow.on('submit', function (data) {
    readmeContent[formwindow.data.sectionbeingedited].name = data.title;
    readmeContent[formwindow.data.sectionbeingedited].description = data.editor;
    readmeContent[formwindow.data.sectionbeingedited].value = formenabledcheckbox.checked;
    // box.setContent(generateReadme());
    box.setMarkdown(generateReadme());
    formwindow.hide();
    sideMenu.focus();
    screen.render();
});

// Prompt box
const promptbox = blessed.prompt({
    top: 'center',
    left: 'center',
    width: 'shrink',
    height: 'shrink',
    content: 'prompt',
    keys: true,
    tags: true,
    shadow: true,
    // keys: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'yellow',
        bg: 'blue',
        border: {
            fg: 'white'
        },
        focus: {
            border: {
                fg: 'white',
                bg: 'purple'
            }
        },
        hover: {
            bg: 'red'
        }
    }
});

// Alert box
const alertbox = blessed.question({
    top: 'center',
    left: 'center',
    width: '50%',
    height: 'shrink',
    content: 'Alert',
    tags: true,
    shadow: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
        style: {
            bg: 'red'
        }
    },
    keys: true,
    vi: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        bg: 'red',
        border: {
            fg: 'black'
        },
        focus: {
            border: {
                fg: 'white',
                bg: 'red'
            }
        },
        hover: {
            bg: 'red'
        }
    }
});

// -----------------------------------------------------------------------
// License selection table
// -----------------------------------------------------------------------
const licensetable = blessed.listtable({
    top: 'center',
    left: 'center',
    width: '90%',
    height: '80%',
    content: 'Licenses',
    tags: true,
    shadow: true,
    keys: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'yellow',
        bg: 'blue',
        border: {
            fg: 'yellow'
        },
        header: {
            fg: 'black',
            bg: 'white'
        },
        selected: {
            fg: 'black',
            bg: 'cyan'
        },
        item: {
            fg: 'yellow',
            bg: 'blue'
        },
        focus: {
            border: {
                fg: 'white',
                bg: 'blue'
            }
        },
        hover: {
            bg: 'blue'
        }
    }
});


licensetable.key(["pagedown"], function () {
    // box.content = 'SELECTED LICENSE ITEM' + ' - ' + this.selected + ' - ' + licensearray[this.selected][0] + ' - ' + Math.min(this.selected+10,this.items.length+1);
    licensetable.select(Math.min(this.selected + 10, this.items.length));
    screen.render();
});

licensetable.key(["pageup"], function () {
    // box.content = 'SELECTED LICENSE ITEM' + ' - ' + this.selected + ' - ' + licensearray[this.selected][0] + ' - ' + Math.max(this.selected-10,2);
    licensetable.select(Math.max(this.selected - 10, 1));
    screen.render();
});

// Receive select event from licensetable
licensetable.on('select', (item, selected) => {

    // Set the license information to the readme content
    let selectedlicense = licenses.find(elem => {
        // box.content = 'SELECTED LICENSE ITEM' + JSON.stringify(elem) + ' - ' + elem.id + ' - ' + licensearray[selected][0];
        if (licensetable.isLong) {
            return elem.id === licensearray_full[selected][0];
        } else {
            return elem.id === licensearray[selected][0];
        };
    });
    // box.content = 'SELECTED LICENSE ITEM' + ' - ' + JSON.stringify(selectedlicense);
    // Add to the license section and add license badge URLs after the README 
    if (licensetable.isLong) {
        readmeContent.license.description = `[${licensearray_full[selected][0]}](${selectedlicense.text[0].url}) - ${licensearray_full[selected][1]}`;
        readmeContent.title.description += `\n\n[![License](https://img.shields.io/badge/License-${licensearray_full[selected][0].replace(/[- ]/g, '_')}-blue.svg)](${selectedlicense.text[0].url})`
    } else {
        readmeContent.license.description = `[${licensearray[selected][0]}](${selectedlicense.text[0].url}) - ${licensearray[selected][1]}`;
        readmeContent.title.description += `\n\n[![License](https://img.shields.io/badge/License-${licensearray[selected][0].replace(/[- ]/g, '_')}-blue.svg)](${selectedlicense.text[0].url})`
    };
    // box.setContent(generateReadme());
    box.setMarkdown(generateReadme());
    licensetable.hide();
    sideMenu.focus();
    screen.render();
});
// sideMenu.key('d', () => { console.log('got an a'); });

licensetable.key(['space'], function (data) {
    // box.content = 'SELECTED LICENSE ITEM' + ' - ' + this.selected + ' - ' + licensearray[this.selected][0];
    licensetable.select(this.selected);
    screen.render();
});

// sideMenu.on('selected', () => { console.log('got an enter'); });
// sideMenu.key('d', () => { console.log('got an a'); });

// sideMenu.key(['space', 'o'], function () {
//     box.content = 'got space or "o"';
//     this.enterSelected(); // Emit select and action event
// });

function displayAlert(err) {
    alertbox.focus();
    alertbox.ask(err, (err, data) => {
        sideMenu.focus();
        alertbox.hide();
        screen.render();
    });
};

function displayForm(data) {
    // Set up form window - populate it with data from readmeContent
    formwindow.setContent(`Editing ${data}`);
    formsectiontitle.setValue(readmeContent[data].name);
    formsectioneditor.setValue(readmeContent[data].description);
    if (readmeContent[data].value) { formenabledcheckbox.check() } else { formenabledcheckbox.uncheck() };
    formwindow.data['sectionbeingedited'] = data;
    formwindow.show();
    formsectioneditor.focus();
    screen.render();
};

function displayLicenseTable(isLong) {
    if (isLong) {
        licensetable.isLong = true;
        licensetable.setData(licensearray_full);
    } else {
        licensetable.isLong = false;
        licensetable.setData(licensearray);
    };
    licensetable.show();
    licensetable.focus();
    screen.render();
};

function populateDependencies() {
    let filedata;
    try {
        filedata = fs.readFileSync('package.json');
        let dependencies = JSON.parse(filedata);
        let dependencyString = "";
        Object.keys(dependencies.dependencies).forEach(elem => {
            dependencyString += `- ${elem}: ${dependencies.dependencies[elem]}\n`;
        });
        readmeContent.dependencies.description = dependencyString + '\n';
    } catch (err) {
        displayAlert(err);
    };
};

// ----------------------------------------------------------
// Handle main menu options
// ----------------------------------------------------------
sideMenu.on('select', (async function (item, selected) {
    //box.setContent(`got an enter/select event',\nindex: ${this.selected} / ${selected};\nvalue: ${this.items[this.selected].content} / ${item.content}`);
    //await displayAlert(`got an enter/select event',\nindex: ${this.selected} / ${selected};\nvalue: ${this.items[this.selected].content} / ${item.content}`);
    switch (this.items[this.selected].content) {
        case "select license":
            displayLicenseTable(false);
            break;
        case "select license full":
            displayLicenseTable(true);
            break;
        case "refresh display":
            //box.setContent(generateReadme());
            box.setMarkdown(generateReadme());
            screen.render();
            break;
        case "populate dependencies":
            populateDependencies();
            // box.setContent(generateReadme());
            box.setMarkdown(generateReadme());
            screen.render();
            break;
        case "add github username":
            promptbox.readInput('Enter your GitHub username:', config.githubusername, (err, value) => {
                if (err) { displayAlert(err) }
                else {
                    config.githubusername = value;
                    readmeContent.questions.description += `\nGitHub profile: https://github.com/${value}\\\nPost your questions in the "issues" section in the GitHub repository.\n`;
                    // box.setContent(generateReadme());
                    box.setMarkdown(generateReadme());
                };
                promptbox.hide();
                screen.render();
            });
            break;
        case "add e-mail":
            promptbox.readInput('Enter your e-mail address:', config.email, (err, value) => {
                if (err) { displayAlert(err) }
                else {
                    config.email = value.trim();
                    readmeContent.questions.description += `\nE-mail: [${value}](mailto:${value})\\\nFor questions regarding this repository, please specify the repository URL.\n`;
                    // box.setContent(generateReadme());
                    box.setMarkdown(generateReadme());
                };
                promptbox.hide();
                screen.render();
            });
            break;
        case "save":
            promptbox.readInput('Enter the filename to save to:', config.readmefileame, (err, value) => {
                if (err) { displayAlert(err) }
                else {
                    config.readmefileame = value;
                    try {
                        fs.writeFileSync(value, generateReadme());
                    } catch (err) {
                        displayAlert(err);
                    };
                };
                promptbox.hide();
                screen.render();
            });
            break;
        case "reset":
            alertbox.ask("Warning! This will clear all data. Proceed? (Enter: OK, ESC: Cancel)", (err, answer) => {
                if (answer) {
                    // Clear all data from all sections and refresh screen
                    readmeContent = structuredClone(readmetemplate);
                    // box.setContent(generateReadme());
                    box.setMarkdown(generateReadme());
                };
                sideMenu.focus();
                alertbox.hide();
                screen.render();
            });
            break;
        case "quit":
            return process.exit(0);
            break;
        case "------------------":
            // separator, ignore
            break;
        default:
            displayForm(this.items[this.selected].content);
    };
    // console.log(
    //     'got an enter/select event',
    //     'index: ', this.selected, '/', selected, ';',
    //     'value:', this.items[this.selected].content, '/', item.content
    // );
}));

// Navigate between the two windows
sideMenu.key(["tab"], function () {
    box.focus();
    screen.render();
});

box.key(["tab"], function () {
    sideMenu.focus();
    screen.render();
});

box.key(["pagedown"], function () {
    //console.log("pagedown");
    box.scroll(parseInt(this.height / 2));
    screen.render();
});

box.key(["pageup"], function () {
    this.scroll(-parseInt(this.height / 2));
    screen.render();
});

// Set up screen
screen.append(desktop);
desktop.append(box);
desktop.append(sideMenu);
desktop.append(formwindow);
desktop.append(alertbox);
desktop.append(promptbox);
desktop.append(licensetable);
formwindow.hide();
licensetable.hide();
screen.title = 'Readme Generator TUI';

box.setMarkdown(generateReadme());

// quit
screen.key(['q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

//allow control the table with the keyboard
// licensetable.focus();
sideMenu.focus();

// screen.render();

