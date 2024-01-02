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

let inquirer = require("inquirer");

let blessed = require("blessed");
// let blessed = require('neo-blessed'),   // you can use 'neo-blessed' or 'blessed' depending on your preference
//     // contrib = require('blessed-contrib'),
// screen = blessed.screen();
let screen = new blessed.screen();

// Get open-source licenses (Source: https://api.opensource.org/licenses/ and https://github.com/OpenSourceOrg/licenses)
let licenses;
try {
    licenses = JSON.parse(fs.readFileSync('licenses.json'));
} catch (err) {
    displayAlert(err);
};

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

const readmetemplate = {
    title: {
        name: "Title",
        value: false,
        description: "Enter the title of your application",
    },
    logo: {
        name: "Logo",
        value: false,
        description: "Specify a logo for your application"
    },
    description: {
        name: "Description",
        value: true,
        description: "Enter a description of your project"
    },
    installation: {
        name: "Installation",
        value: true,
        description: "Document how users can install your application"
    },
    usage: {
        name: "Usage",
        value: true,
        description: "Document how your application is used"
    },
    license: {
        name: "License",
        value: true,
        description: "Choose or create the license for your application"
    },
    contributing: {
        name: "Contributing",
        value: true,
        description: "Enter guidelines on contributing to this project"
    },
    tests: {
        name: "Testing",
        value: true,
        description: "Enter testing details"
    },
    questions: {
        name: "Questions",
        value: true,
        description: "Enter frequently asked questions"
    },
    repository: {
        name: "Repository",
        value: true,
        description: "Specify your repository, ie. GitHub"
    },
    dependencies: {
        name: "Dependencies",
        value: true,
        description: "Document the dependencies of your application from package.json"
    },
    section: {
        name: "Section",
        value: false,
        description: "Add a new section to your README file"
    },
};

let readmeContent = Object.assign({}, readmetemplate);

function generateReadme() {
    let readmeString = "";

    readmeString += `# ${readmeContent.title.description}\n\n`;

    readmeString += '## Table of Contents';

    // Add Table of Contents
    Object.keys(readmeContent).forEach(elem => {
        if (readmeContent[elem].value) {
            readmeString += `- [${readmeContent[elem].name}](#${readmeContent[elem].name})\n`;
        };
    });
    readmeString += '\n\n';

    // Add section contents
    Object.keys(readmeContent).forEach(elem => {
        if (readmeContent[elem].value) {
            readmeString += `## ${readmeContent[elem].name}\n\n${readmeContent[elem].description}\n\n`;
        };
    });
    readmeString += '\n\n';

    return readmeString;
};


// Get a list of open source licenses
// https://api.opensource.org/licenses/

const APIURL = 'http://localhost:3001';

// Example of API calls to server side

// Get all products
async function fetchProducts() {
    const response = await fetch(`${APIURL}/api/products`);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const products = await response.json();
    return products;
};

// Get all categories
async function fetchCategories() {
    const response = await fetch(`${APIURL}/api/categories`);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const products = await response.json();
    return products;
};

// Get all tags
async function fetchTags() {
    const response = await fetch(`${APIURL}/api/tags`);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const products = await response.json();
    return products;
};

// Blessed js implementation example

// Background desktop container
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

// Right side box
const box = blessed.box({
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
        name: "refresh display",
        value: "refresh display",
        description: "Refresh the current README content on the left box",
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
    left: 2,
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
// Reset/clear form data
var formreset = blessed.button({
    parent: formwindow,
    name: 'reset',
    content: 'Clear',
    bottom: 0,
    left: 15,
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
    left: 27,
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

var msg = blessed.message({
    parent: screen,
    top: 0,
    left: 0,
    style: {
        italic: true,
        fg: 'green'
    }
});

// Form Event management
// submit form
formsubmit.on('press', function () {
    formwindow.submit();
});
// clear all form entries
formreset.on('press', function () {
    formwindow.reset();
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
    // console.log(data);
    // msg.display(`Value: ${data.sectionbeingedited} ${this.name}, Title: ${data.title}, Content: ${data.editor} \n`, function () {
    //     var summary = '';
    //     summary = `Value: ${data.sectionbeingedited} ${this.name}, Title: ${data.title}, Content: ${data.editor} \n`;
    //     console.log(summary);
    // });
    // displayAlert(formwindow.data.sectionbeingedited);
    // console.log(formwindow.data.sectionbeingedited);
    readmeContent[formwindow.data.sectionbeingedited].name = data.title;
    readmeContent[formwindow.data.sectionbeingedited].description = data.editor;
    readmeContent[formwindow.data.sectionbeingedited].value = formenabledcheckbox.checked;
    box.setContent(generateReadme());
    formwindow.hide();
    sideMenu.focus();
    screen.render();
});
formwindow.on('reset', function () {
    msg.display('Form cleared!', function () { });
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

// received selected event from licensetable
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
    if (licensetable.isLong) {
        readmeContent.license.description = `[${licensearray_full[selected][0]}](${selectedlicense.text[0].url}) - ${licensearray_full[selected][1]}`;
    } else {
        readmeContent.license.description = `[${licensearray[selected][0]}](${selectedlicense.text[0].url}) - ${licensearray[selected][1]}`;
    };
    box.setContent(generateReadme());
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


// Navigate between modal boxes with display*() functions

function displayContent(content) {
    let pretty_content = JSON.stringify(content, null, 4);
    box.scrollTo(0);
    box.setContent(pretty_content);
    screen.render();
};

function displayAlert(err) {
    alertbox.focus();
    alertbox.ask(err, () => {
        sideMenu.focus();
        alertbox.hide();
        screen.render();
    });
};

function displayForm(data) {
    formwindow.setContent(`Editing ${data}`);
    formsectiontitle.setValue(readmeContent[data].name);
    formsectioneditor.setValue(readmeContent[data].description);
    formwindow.data['sectionbeingedited'] = data;
    readmeContent[data].value ? formenabledcheckbox.check() : formenabledcheckbox.uncheck();
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
            box.setContent(generateReadme());
            screen.render();
            break;
        case "populate dependencies":
            populateDependencies();
            box.setContent(generateReadme());
            screen.render();
            break;

        // case 0:
        //         let products;
        //         try {
        //             products = await fetchProducts();
        //         } catch (err) {
        //             displayAlert(err);
        //         };
        //         displayContent(products);
        //         break;
        //     case 1:
        //         let categories;
        //         try {
        //             categories = await fetchCategories();
        //         } catch (err) {
        //             displayAlert(err);
        //         };
        //         displayContent(categories);
        //         break;
        //     case 2:
        //         let tags;
        //         try {
        //             tags = await fetchTags();
        //         } catch (err) {
        //             displayAlert(err);
        //         };
        //         displayContent(tags);
        //         break;
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

sideMenu.key('p', async function () {
    // box.setContent(`got an "p" ${this.selected}, ${this.items[this.selected].content}`);
    // screen.render();
    const products = await fetchProducts();
    displayContent(products);
});

sideMenu.key('c', async function () {
    // box.setContent(`got a "b" ${this.selected}, ${this.items[this.selected].content}`);
    // screen.render();
    const categories = await fetchCategories();
    displayContent(products);
});

sideMenu.key('t', async function () {
    const tags = await fetchTags();
    displayContent(tags);
});

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
desktop.append(licensetable);
formwindow.hide();
licensetable.hide();
screen.title = 'Readme Generator TUI';

// quit
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

//allow control the table with the keyboard
// licensetable.focus();
sideMenu.focus();

// screen.render();

