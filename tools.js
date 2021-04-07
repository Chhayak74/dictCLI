const wordData = require('./words.json');
let dataCopy = Object.assign({},wordData);

function getRandom(type, obj = dataCopy) {
  let propid;
  let randObj = Object.assign({},obj);
  if (type == 'prop') {
    propid = randObj.id;
    delete randObj.id;
  }
  let value = randObj[Object.keys(randObj)[Math.floor(Math.random() * Object.keys(randObj).length)]];
  return type == 'prop' ? { id: propid, value: value } : value;

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
