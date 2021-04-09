const { search, getRandom, printToCli , checkMatch, findObjById} = require('./tools.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'DICT>'
});
const chalk = require('chalk');

const wordData = require('./words.json');
let wdata;
let tryagain = true, playState = false, showhint = false;
rl.on('line', (lineIn) => {
  let line = lineIn.trim();
  let isDictCommand = line && line.indexOf('./dict') > -1;
  if (isDictCommand) {
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1 && !playState) {
      pid = process.pid;
      printToCli(getRandom('detail'), 'wod');
    } else if (dictArgs.length == 2 && dictArgs[1] == 'play' && !playState) {
      wdata = getRandom('prop', Object.assign(getRandom('detail')));
      if (wdata.id) {
        if (tryagain) {
          // rl.write(`${wdata.value} \n`);
          console.log(chalk.bgBlue.white("Guess the word with below details -"));
          printToCli(wdata.value, 'play')
        }
        playState = true;
      }
    } else if (dictArgs.length == 2 && !playState) {

      printToCli(search(dictArgs[1]), 'details', dictArgs[1]);
    } else if (dictArgs.length == 3 && !playState) {
      printToCli(search(dictArgs[2], dictArgs[1]), dictArgs[1], dictArgs[2]);
    } else {
      if (playState) {
        console.log(chalk.bgGrey.white("Exiting play mode...Try again!"));
      } else {
        printToCli();
      }
      tryagain = true;
      playState = false;
      showhint = false;
    }
  } else if (playState) {
    if (checkMatch(line, wdata.id)) {
      printToCli("Sweet!", "play");
      playState = false;
      showhint = false;
    } else if (tryagain) {
      tryagain = false;
      printToCli(`Try again...`, "play");
      showhint = true;
    } else if (showhint && !tryagain) {
      let wordObj = findObjById(wdata.id, 'obj');
      console.log(chalk.bgBlue.white("Here's a hint..."));
      printToCli(getRandom('hint', [...wordObj.ant, ...wordObj.syn, ...wordObj.ex]), 'play');
      showhint = false;
    } else {
      printToCli("Game over!!", "play");
      printToCli(findObjById(wdata.id, 'obj'), "play");
      tryagain = true;
      playState = false;
      showhint = false;
    }
  } else if (!playState && !isDictCommand) {
    printToCli();
  }
  rl.prompt();
}).on('close', () => {
  printToCli("Close", 'close');
  process.exit(0);
});




rl.prompt();


