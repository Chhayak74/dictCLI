const { search, random, status } = require('./tools.js');
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
      console.log(random());
    } else if (dictArgs.length == 2) {
      console.log(search(dictArgs[1]))
    } else if (dictArgs.length == 3) {
      console.log(search(dictArgs[1], dictArgs[2]))
    }
  }
  rl.prompt();
});
rl.prompt();

rl.on('exit', () => {
  console.log("Bbye");
});

