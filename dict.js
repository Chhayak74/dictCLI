
const { search, getRandom, status, printToCli } = require('./tools.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'DICT>'
});

const wordData = require('./words.json');
// const { workerData } = require('node:worker_threads');

let attempt;
let pid;
let wdata;
rl.on('line', (line) => {
  if (line && line.split(" ")[0].indexOf('./dict') > -1) {
    attempt = 0;
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1 && process.pid !== pid) {
      console.log("random");
      pid = process.pid;
      printToCli(getRandom('detail'));
    } else if (dictArgs.length == 2 && dictArgs[1] == 'play') {
      pid = process.pid;
      wdata = getRandom('prop', Object.assign(getRandom('detail')));
      playDict(wdata, attempt);
    } else if (dictArgs.length == 2 && process.pid !== pid) {
      console.log("2 args");
      pid = process.pid;
      printToCli(search(dictArgs[1]));
    } else if (dictArgs.length == 3 && process.pid !== pid) {
      console.log("3 args");
      pid = process.pid;
      printToCli(search(dictArgs[2], dictArgs[1]))
    }
  }else{
    rl.prompt();
    rl.on('line', data => {
      if (checkMatch(data, wdata.id)) {
        console.log("correct");
        rl.close();
      }
    })

  }
});

function playDict(wdata, attempt) {
  if (wdata.id) {
    rl.write(`${wdata.value} \n`);
    rl.prompt();
    rl.on('line', data => {
      if (attempt == 0) {
        if (checkMatch(data, wdata.id)) {
          // rl.write(`Correct Answer!! \n`);
          rl.close();
        } else {
          playDict(wdata, ++attempt);
        }
      } else if (attempt == 1) {
        console.log(`Try again...\n ${attempt}`);
        ++attempt;
      } else {
        console.log("Last trial");
      }
    }).on('close', () => {
      process.exit(0);
    });

  }
}

function checkMatch(answer, id) {
  return wordData[answer] ? wordData[answer].id == id: false;
}

rl.prompt();


