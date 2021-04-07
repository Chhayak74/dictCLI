const wordData = require('./words.json');
// const words = Object.keys(wordData);

//pick random words
// function random(type) {
//   let randWord = wordData[words[Math.floor(Math.random() * words.length)]];
//   let randProp = randWord[Object.keys(randWord)[Math.floor(Math.random() * Object.keys(randWord).length)]];
//   if (typeof (randProp) == 'number') {
//     getRandom(randWord, 'prop');
//   }
//   return (type == 'detail' ? randWord : )
// }

function getRandom(type, obj = wordData) {
  if(type == 'prop'){
    delete obj.id;
  }
  return obj[Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)]];

}

//maintain current command status
function status(pid) {
  //word,trial,command
}

//search for word and return the data
function search(word, detail) {
  let searchedWord = wordData[word];
  if (word && detail) {
    return searchedWord[detail];
  } else if (word) {
    return searchedWord;
  } else {
    return random();
  }
}

function printToCli(data) {
  console.log(data);
}


module.exports = {
  getRandom, status, search, printToCli
}
