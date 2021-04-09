//Dependencies and constants
const { search, getRandom, printToCli , checkMatch, findInfoById} = require('./tools.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'DICT>'
});
const chalk = require('chalk');

//variables for handling play command
let wdata, tryagain = true, playState = false, showhint = false;

rl.on('line', (lineIn) => {
  let line = lineIn.trim();
  let isDictCommand = line && line.indexOf('./dict') > -1;
  if (isDictCommand) {
    /****************************************************** 
      Handle all valid ./dict commands
      ./dict --> Word of the day
      ./dict <word> --> All the properties of entered word
      ./dict ex <word> --> Examples of entered word
      ./dict def <word> --> Definition of entered word
      ./dict ant <word> --> Antonyms of entered word
      ./dict syn <word> --> Synonyms of entered word
    *******************************************************/
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1 && !playState) {
      pid = process.pid;
      printToCli(getRandom('detail'), 'wod');
    } else if (dictArgs.length == 2 && dictArgs[1] == 'play' && !playState) {
      wdata = getRandom('prop', Object.assign(getRandom('detail')));
      if (wdata.id) {
        if (tryagain) {
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
    //Once the play command has started
    if (checkMatch(line, wdata.id)) {
      printToCli("Sweet!", "play");
      playState = false;
      showhint = false;
    } else if (tryagain) {
      tryagain = false;
      printToCli(`Try again...`, "play");
      showhint = true;
    } else if (showhint && !tryagain) {
      let wordObj = findInfoById(wdata.id, 'obj');
      printToCli("Here's a hint...","play");
      printToCli(getRandom('hint', [...wordObj.ant, ...wordObj.syn, ...wordObj.ex]), 'play');
      showhint = false;
    } else {
      printToCli("Game over!!", "play");
      printToCli(findInfoById(wdata.id, 'obj'), "play");
      tryagain = true;
      playState = false;
      showhint = false;
    }
  } else if (!playState && !isDictCommand) {
    //Handle invalid commands
    printToCli();
  }
  rl.prompt();
}).on('close', () => {
  //Handle CLI Close
  printToCli("Close", 'close');
  process.exit(0);
});

//Initiate the CLI Prompt
rl.prompt();


