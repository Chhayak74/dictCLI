
const { search, getRandom, status, printToCli } = require('./tools.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'DICT>'
});


rl.on('line', (line) => {
  if (line) {
    let dictArgs = line.split(" ");
    if (dictArgs.length == 1) {
      printToCli(getRandom('prop', getRandom('detail')));
    } else if (dictArgs.length == 2) {
      printToCli(search(dictArgs[1]));
    } else if (dictArgs.length == 3) {
      printToCli(search(dictArgs[2], dictArgs[1]))
    }
  }
  rl.prompt();
});
rl.prompt();

rl.on('close', () => {
  console.log("THE ENd!!");
});

