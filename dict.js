//Dependencies and constants
const { search, getRandom, printToCli, checkMatch } = require('./tools.js');
const { findInfoById } = require('./constants');
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
      case 1 : ./dict --> Word of the day
      case 2 : ./dict <word> --> All the properties of entered word
      case 3 : ./dict ex --> Examples of valid words in dictionary
      case 4 : ./dict def <word> --> Definition of entered word
      case 5 : ./dict ant <word> --> Antonyms of entered word
      case 6 : ./dict syn <word> --> Synonyms of entered word
      case 7 : ./dict play --> Word guessing game
    *******************************************************/
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1 && !playState) {
      //case 1
      pid = process.pid;
      printToCli(getRandom('detail'), 'wod');
    } else if (dictArgs.length == 2 && dictArgs[1] == 'play' && !playState) {
      //case 7
      wdata = getRandom('prop', Object.assign(getRandom('detail')));
      if (wdata.id) {
        if (tryagain) {
          console.log(chalk.bgBlue.white("Guess the word with below details -"));
          printToCli(wdata.value, 'play')
        }
        playState = true;
      }
    } else if (dictArgs.length == 2 && !playState && dictArgs[1] != 'ex' ) {
      //case 2
      printToCli(search(dictArgs[1]), 'details', dictArgs[1]);
    } else if (dictArgs.length == 2 && !playState && dictArgs[1] == 'ex') {
      //case 3

      printToCli(dictArgs[1]);
    } else if (dictArgs.length == 3 && !playState) {
      //case 4-6
      printToCli(search(dictArgs[2], dictArgs[1]), dictArgs[1], dictArgs[2]);
    } else {
      //Handling case where user tries other commands while case 7
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
      //Handling correct answer
      printToCli("Sweet!", "play");
      playState = false;
      showhint = false;
    } else if (tryagain) {
      //Handling first wrong attempt
      tryagain = false;
      printToCli(`Try again...`, "play");
      showhint = true;
    } else if (showhint && !tryagain) {
      //Handling seacond wrong attempt
      let wordObj = findInfoById(wdata.id, 'obj');
      printToCli("Here's a hint...", "play");
      printToCli(getRandom('hint', [...wordObj.ant, ...wordObj.syn]), 'play');
      showhint = false;
    } else {
      //Handling exhausted attempts
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


