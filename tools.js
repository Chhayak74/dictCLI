const chalk = require('chalk');
const wordData = require('./words.json');
const props = ["id", "syn", "ant", "ex", "def"];
const words = Object.keys(wordData);

let dataCopy = Object.assign({}, wordData);
const propDefinitions = {
  "ex": "Examples",
  "def": "Definition",
  "ant": "Antonyms",
  "syn": "Synonyms",
  "wod": "Word Of The Day",
  "details": "All the properties"
}

function getRandom(type, dataSet = dataCopy) {

  if (type == 'hint') {

    return dataSet[Math.floor(Math.random() * dataSet.length)];
  } else {
    let propid;
    let randObj = Object.assign({}, dataSet);
    if (type == 'prop') {
      propid = randObj.id;
      delete randObj.id;
    }
    let value = randObj[Object.keys(randObj)[Math.floor(Math.random() * Object.keys(randObj).length)]];
    if (typeof (value) == 'object' && value.length) {
      value = value[Math.floor(Math.random() * value.length)];
    }
    return type == 'prop' ? { id: propid, value: value } : value;
  }


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

function printToCli(data, prop, word) {

  if (data && Object.keys(propDefinitions).indexOf(prop) > -1) {
    console.log("---------------------------------------------------------------");
    if (prop == 'wod' || prop == 'details') {
      console.log(`****************** ${propDefinitions[prop]} --> ${findObjById(data.id, 'word')} ******************`);
      console.log(chalk.bgGrey.white(`Word : ${findObjById(data.id, 'word')}
Definition : ${data.def}
Synonyms : ${data.syn}
Antonyms : ${data.ant}
Examples : ${data.ex}
`));

    } else {
      console.log(chalk.bgGrey.white(`********************** ${propDefinitions[prop]} of ${word}: ********************** \n`));
    }
    if (data !== undefined && data.length && typeof (data) == 'object') {
      console.log(chalk.bgBlueBright.white(data.join(",")));
    } else if (typeof(data) == 'string') {
      console.log(chalk.bgBlueBright.white(data));
    }
    console.log("---------------------------------------------------------------");
  } else if (prop == 'play') {
    console.log("----------------------------------------------------");
    if (typeof (data) == 'object' && !data.length) {
      console.log(chalk.bgGrey.white(`Definition : ${data.def}
Synonyms : ${data.syn}
Antonyms : ${data.ant}
Examples : ${data.ex}
`));
    } else {
      console.log(chalk.bgBlue.white(data));
    }
    console.log("----------------------------------------------------");
  } else if (prop == 'close') {
    console.log(`\n----------------------------------------------------`);
    console.log(`-***************** ${chalk.bgGray.black("Have a nice day!!")} **************-`);
    console.log("----------------------------------------------------");
  } else {
    `${console.log("----------------------------------------------------")};
    ${console.log(chalk.bgRed.white("No such word/command found"))};
    ${console.log("----------------------------------------------------")};`
  }
}

function checkMatch(answer, id) {
  return wordData[answer] ? wordData[answer].id == id : false;
}

function findObjById(id, prop) {
  for (let word in wordData) {
    if (wordData[word].id == id) {
      return prop == 'obj' ? wordData[word] : word;
    }
  }
}




module.exports = {
  getRandom, search, printToCli, checkMatch, findObjById
}
