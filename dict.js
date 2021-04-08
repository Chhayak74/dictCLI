
const { search, getRandom, printToCli } = require('./tools.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'DICT>'
});

const wordData = require('./words.json');
let wdata;
let tryagain = true;
let playState = false;
rl.on('line', (lineIn) => {
  let line = lineIn.trim();
  let isDictCommand = line && line.indexOf('./dict') > -1;
  if (isDictCommand) {
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1 && !playState) {
      pid = process.pid;
      printToCli(getRandom('detail'));
    } else if (dictArgs.length == 2 && dictArgs[1] == 'play' && !playState) {
      wdata = getRandom('prop', Object.assign(getRandom('detail')));
      if (wdata.id) {
        if (tryagain) {
          rl.write(`${wdata.value} \n`);
        }
        playState = true;
      }
    } else if (dictArgs.length == 2 && !playState) {
      
      printToCli(search(dictArgs[1]));
    } else if (dictArgs.length == 3 && !playState) {
      printToCli(search(dictArgs[2], dictArgs[1]))
    } else {
      console.log("No such word/command found");
    }
  } else if (playState) {
    if (checkMatch(line, wdata.id)) {
      console.log("Sweet!");
      playState = false;
    } else if (tryagain) {
      tryagain = false;
      console.log(`Try again...`);
    } else {
      console.log("Game over!!");
      tryagain = true;
      playState = false;
    }
  }
  rl.prompt();
}).on('close', () => {
  console.log("close called");
  process.exit(0);
});


function checkMatch(answer, id) {
  return wordData[answer] ? wordData[answer].id == id : false;
}

rl.prompt();


