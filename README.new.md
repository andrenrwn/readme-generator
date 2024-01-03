# README Generator

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/mit)

## Table of Contents

- [Description](#Description)
- [Repository](#Repository)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Questions](#Questions)
- [License](#License)
- [Dependencies](#Dependencies)


## Description

This application will help you assemble a complete README.md for your project. It is run from the command line and uses blessed (an implemntation of ncurses for nodejs).

## Repository



## Installation

Clone from git repository
$ npm install

## Usage

Start the application:
$ node index.js

Left window: Menu Options
Right window: Assembled README content (scrollable)

Navigate using keyboard keys:
- Up/Down : Move menu selection up/down
- Tab : Switch between left and right panes
- Enter : Choose selected menu item
- Esc : Go back or cancel
- 'q' : Quit program

Section Editor

Once you have selected a section to edit, you are presented with the section editor.
In this window naviate using the following:
- Up/Down : Move among different buttons and input text areas
- Enter : Choose/select button / input area
- Submit : Save the edited information
- Cancel : Go back to the main menu
- Clear : Clear the section information. NOTE: This also *disables* the section.
- Enabled [x] checkbox : Enables / Disables the section. Disabled sections are not assembled into the README document


## Contributing

Anyone is welcome to contribute to this project. Post your comments or interests using the issues section in the github repo.

## Questions


GitHub profile: https://github.com/andrenrwn
Post your questions in the "issues" section in the GitHub repository. 
E-mail: [141073152+andrenrwn@users.noreply.github.com](mailto:141073152+andrenrwn@users.noreply.github.com)
For questions regarding this repository, please specify the repository URL. 

## License

[MIT](https://opensource.org/licenses/mit) - MIT/Expat License

## Dependencies

- blessed-contrib: ^4.11.0
- inquirer: ^8.0.0
- neo-blessed: latest





