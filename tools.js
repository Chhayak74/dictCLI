const words = require('./words.json');

//pick random words
function random() {
  // console.log(typeof(words));
  // console.log(words);
  let keys = Object.keys(words);
  // console.log(keys);
  return words[keys[Math.floor(Math.random()*keys.length)]];
}

//maintain current command status
function status(pid) {
  //word,trial,command
}

//search for word and return the data
function search(word, detail) {
  if (word && detail) {
    return word + " " + detail;
  } else if (word) {
    return word;
  } else {
    return random();
  }
}


module.exports = {
  random, status, search
}

//ddd