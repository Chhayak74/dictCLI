
const { search, getRandom, status, printToCli } = require('./tools.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'DICT>'
});

const wordData = require('./words.json');


rl.on('line', (line) => {
  if (line) {
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1) {
      console.log("1");
      printToCli(getRandom('detail'));
    } else if (dictArgs.length == 2 && dictArgs[1] == 'play') {
      console.log("2");
      playDict(getRandom('prop',Object.assign(getRandom('detail'))));
    }else if (dictArgs.length == 2) {
      console.log("3");
      printToCli(search(dictArgs[1]));
    } else if (dictArgs.length == 3) {
      console.log("4");
      printToCli(search(dictArgs[2], dictArgs[1]))
    }
  }
  rl.prompt();
});

function playDict(data){
  if (data.id) {
    rl.on('line', data => {
      console.log("here")
      if (checkMatch(data, data.id)) {
        rl.write("Correct Answer!!");
      } else {
        rl.write("Try again...");
        rl.on('line', data => {
          if (checkMatch(data, data.id)) {
            rl.write(`Correct Answer!! \n`);
          } else {
            rl.write(`Better luck next time! \n`);
            process.exit();
          }
        })
      }
    })

  }
}

function checkMatch(data, id) {
  for (word in wordData) {
    if (word.id == id) {
      return Object.values(word).indexOf(data) > -1;
    }
  }
}

rl.prompt();

rl.on('close', () => {
  console.log("THE ENd!!");
});

