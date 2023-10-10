var blessed = require("neo-blessed");
var inquirer = require("inquirer");
var editor = require("@inquirer/editor");

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
});

screen.title = "my window title";

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: "center",
  left: "center",
  width: "50%",
  height: "50%",
  content: "Hello {bold}world{/bold}!",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    fg: "white",
    bg: "magenta",
    border: {
      fg: "#f0f0f0",
    },
    hover: {
      bg: "green",
    },
  },
});

// Create menu
menubar = blessed.listbar({
  parent: screen,
  keys: true,
  bottom: 0,
  left: 0,
  height: 1,
  style: { item: { fg: "yellow" }, selected: { fg: "yellow" } },
  commands: {
    Login: {
      keys: ["l", "L"],
      callback: () => {
        box.setLine(1, "LLLLLLLLLLLL");
      },
    },
    "Toggle Autotrading": {
      keys: ["a", "A"],
      callback: () => {
        box.setLine(1, "AAAAAAAAAAA");
      },
    },
    "Make a Trade": {
      keys: ["t", "T"],
      callback: () => {
        box.setLine(1, "TTTTTTTTT");
      },
    },
    Help: {
      keys: ["h", "H"],
      callback: () => {
        box.setLine(1, "HHHHHHHHHHHH");
      },
    },
    Logout: {
      keys: ["o", "O"],
      callback: () => {
        box.setLine(1, "LOGOOOOOOOOOOUUUUUUT");
      },
    },
    Exit: {
      keys: ["C-c", "escape"],
      callback: () => process.exit(0),
    },
  },
});

screen.append(menubar);

// Append our box to the screen.
screen.append(box);

// Add a png icon to the box
var icon = blessed.image({
  parent: box,
  top: 0,
  left: 0,
  type: "overlay",
  width: "shrink",
  height: "shrink",
  file: __dirname + "/my-program-icon.png",
  search: false,
});

// If our box is clicked, change the content.
box.on("click", function (data) {
  box.setContent("{center}Some different {red-fg}content{/red-fg}.{/center}");
  screen.render();
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
    ])
    .then((response) => {
      console.log("Success!");
      box.setContent(response);
    });
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key("enter", function (ch, key) {
  box.setContent("{right}Even different {black-fg}content{/black-fg}.{/right}\n");
  box.setLine(1, "bar");
  box.insertLine(1, "foo");
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
