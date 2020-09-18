#!/usr/bin/env node
"use strict";
var c = require("chalk");
var link = require("terminal-link");
var img = require("terminal-image");
var got = require("got");
var ww = require("word-wrap");
var iq = require("inquirer");
var opn = require("open");

got(
  "https://avatars3.githubusercontent.com/u/1120141?s=460&u=a0887697dc367f70ceef2d92ebd273b1d6aeea72&v=4",
  {
    responseType: "buffer",
  }
)
  .then(function (image) {
    return img.buffer(image.body, { width: "33%" });
  })
  .then(function (image) {
    console.log(image);
    console.log(
      ww(
        `
Hello, this is ${c.blue.bold("Mario Pereira")}!

I'm a passionate ${c.bgRed.white.bold("frontend developer")} living in ${c.bold(
          "Lisbon, Portugal"
        )}, working for ${link(
          c.hex("#3858A2").bold("Uniplaces"),
          "https://www.uniplaces.com"
        )}.
I love ${c.underline.bold.green(
          "frontend development"
        )} and I build things on my GitHub profile ${link(
          c.red.bold("github.com/niceoutput"),
          "https://github.com/niceoutput"
        )}.
I love ${c.bold.yellow("JavaScript")} and ${c.bold.red(
          "React and Styled Components"
        )}.

`.trim(),
        { width: 200, trim: true }
      )
    );

    console.log("\n\n");
    iq.prompt([
      {
        type: "list",
        message: "Do you want to learn more about me?",
        name: "open",
        choices: [
          {
            name: c.gray(`💻  What am I doing? (${c.bold("GitHub")})`),
            value: "https://github.com/niceoutput",
          },
          {
            name: c.cyan(`🐦  What do I think? (${c.bold("Twitter")})`),
            value: "https://twitter.com/niceoutput",
          },
          {
            name: c.blue(
              `🏹  Curriculum vitae, the path of my life (${c.bold(
                "LinkedIn"
              )})`
            ),
            value: "https://linkedin.com/in/niceoutput",
          },
          { name: c.red("👋  Nope. Bye.\n"), value: false },
        ],
      },
    ])
      .then(function (a) {
        opn(a.open);
        process.exit();
      })
      .catch(function () {});
  })
  .catch(function (e) {
    console.log(e);
  });
