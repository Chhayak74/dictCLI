//Dataset
const { wordData, propDefinitions, props, templates } = require('./constants.js');
const words = Object.keys(wordData);
let dataCopy = Object.assign({}, wordData);

//Get random word details/properties
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
//End - getRandom

//Search for word and return the data
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
//End - search


//Handle console formatting
function printToCli(data, prop, word) {
  if (data && Object.keys(propDefinitions).indexOf(prop) > -1) {
    templates('start_end', data, prop);
    if (prop == 'wod' || prop == 'details') {
      //Word of the day / All details
      templates('allheader', data, prop);
      templates('all', data, prop);
    } else {
      //Other props case - Header
      templates('propheader', data, prop, word);
    }
    if (data !== undefined && data.length && typeof (data) == 'object') {
      //multiple outputs/array data
      templates('prop_list', data, prop);
    } else if (typeof (data) == 'string') {
      //string output data(def)
      templates('prop_string', data, prop);
    }
    templates('start_end', data, prop);
  } else if (data && prop == 'play') {
    //play command output
    templates('start_end', data, prop);
    if (typeof (data) == 'object' && !data.length) {
      templates('all', data, prop);
    } else {
      templates('prop_string', data, prop);
    }
    templates('start_end', data, prop);
  } else if (prop == 'close') {
    //Session terminate case
    templates('close', data, prop);
    templates('start_end', data, prop);
  } else {
    //Default - invalid command
    templates('default', data, prop);
  }
}
//End - Print formatting


//Play command - Check if the answer matches the word prompted 
function checkMatch(answer, id) {
  return wordData[answer] ? wordData[answer].id == id : false;
}
//End - Check match




//Export modules
module.exports = {
  getRandom, search, printToCli, checkMatch
}
