//Module to handle colors in console
const chalk = require('chalk');
const wordData = {
  "Happy": {
    "id": 1,
    "def": "Happy describes a feeling of joy, delight, or glee. It also describes something that is related to or shows joy. Happy can describe someone being willing to do something or be helpful. Happy is used in many expressions that wish good tidings to another person. Happy has a few other senses as an adjective.",
    "ant": ["Sad", "Upset", "Unhappy"],
    "syn": ["Cheerful", "Merry", "Jolly", "Glad", "Pleasant", "Thrilled"]
  },
  "Beautiful": {
    "id": 2,
    "def": "A person or thing that is beautiful possesses qualities that give great pleasure to see, hear, or think about.",
    "ant": ["Dull", "Poor", "Ugly", "Rough"],
    "syn": ["Cute", "Charming", "Elegant", "Pretty"]
  },
  "Big": {
    "id": 3,
    "def": "Something that is big is large in size, height, width, or amount.",
    "ant": ["Small", "Little","Minute", "Tiny"],
    "syn": ["Huge", "Enormous", "Massive","Mammoth", "Large"]
  }

};

const propDefinitions = {
  "ex": "Examples",
  "def": "Definition",
  "ant": "Antonyms",
  "syn": "Synonyms",
  "wod": "Word Of The Day",
  "details": "All the properties"
};

const props = ["id", "syn", "ant", "ex", "def"];


function templates(temp_name, data, prop, word) {

  let template;
  switch (temp_name) {
    case "allheader": template = `${console.log(`****************** ${propDefinitions[prop]} --> ${findInfoById(data.id, 'word')} ******************`)};\n` ;
      return template;
    case "all": `${console.log(chalk.bgGrey.white(`Word : ${findInfoById(data.id, 'word')} \n
Definition : ${data.def} \n
Synonyms : ${data.syn} \n
Antonyms : ${data.ant}`))};`
      return template;

    case "propheader": template = `${console.log(chalk.bgGrey.white(`********************** ${propDefinitions[prop]} of ${word}: ********************** \n`))};`
      return template;

    case "prop_list": template = `${console.log(chalk.bgBlueBright.white(data.join(",")))};`; return template;

    case "prop_string": template = `${console.log(chalk.bgBlueBright.white(data))};`; return template;

    case "examples": template = `${console.log(chalk.bgWhiteBright.black(`************* Examples of valid words in dictionary ***********`))};
   
    ${console.log(chalk.bgRgb(41,110,1).white(Object.keys(wordData).join(`\n`)))}`;
      return template;

    case "close": template = `${console.log(`\n---------------------------------------------------------------`)};
    ${console.log(`-********************* ${chalk.bgGray.black("Have a nice day!!")} ********************-`)};`
      ;
      return template;

    case "start_end": template = `${console.log("---------------------------------------------------------------")};`; return template;

    case "default": template = `${console.log("----------------------------------------------------")};
    ${console.log(chalk.bgRed.white("No such word/command found"))};
    ${console.log("----------------------------------------------------")};`
      return template;

  }

};

//Find word details by id
function findInfoById(id, prop) {
  for (let word in wordData) {
    if (wordData[word].id == id) {
      return prop == 'obj' ? wordData[word] : word;
    }
  }
}
//End - Find word details by id

module.exports = {
  wordData, props, propDefinitions, templates, findInfoById
}
