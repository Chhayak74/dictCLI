const cp = require('child_process');
const wordData = require('./words.json');
const props = ["id", "syn", "ant", "ex", "def"];
const words = Object.keys(wordData);

let dataCopy = Object.assign({}, wordData);

function getRandom(type, obj = dataCopy) {
  let propid;
  let randObj = Object.assign({}, obj);
  if (type == 'prop') {
    propid = randObj.id;
    delete randObj.id;
  }
  let value = randObj[Object.keys(randObj)[Math.floor(Math.random() * Object.keys(randObj).length)]]; 
  if(value.length){
    value = value[Math.floor(Math.random() * value.length)];
  }
  return type == 'prop' ? { id: propid, value: value } : value;

}

//search for word and return the data
function search(word, detail) {
  let searchedWord = wordData[word];
  if (word && detail) {
    return (props.indexOf(detail) > -1 && words.indexOf(word) > -1) ? searchedWord[detail] : undefined;
  } else if (word) {
    return searchedWord;
  } else {
    return getRandom('detail');
  }
}

function printToCli(data) {
  if (data !== undefined && data.length) {
    console.log(data.join(","));
  } else if (data && !data.length) {
    console.log(data);
  } else {
    console.log("No such word/command found");
  }
}




module.exports = {
  getRandom, search, printToCli
}
