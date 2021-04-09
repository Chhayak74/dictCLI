//Module to handle colors in console
const chalk = require('chalk');
const wordData = {
  "Chair": {
    "id": 1,
    "def": "Chair Def",
    "ant": ["nchair1", "nchair2"],
    "syn": ["chair1", "chair2", "chair3"],
    "ex": ["chairex1", "chairex2"]
  },
  "Sofa": {
    "id": 2,
    "def": "Sofa Def",
    "ant": ["nsofa1", "nsofa2", "nsofa3"],
    "syn": ["sofa1", "sofa2"],
    "ex": ["sofaex1", "sofaex2"]
  },
  "Lamp": {
    "id": 3,
    "def": "Lamp Def",
    "ant": ["nlamp1", "nlamp2"],
    "syn": ["lamp1", "lamp2"],
    "ex": ["lampex1"]
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
    case "allheader": template = `${console.log(`****************** ${propDefinitions[prop]} --> ${findInfoById(data.id, 'word')} ******************`)};`;
      return template;
    case "all": `${console.log(chalk.bgGrey.white(`Word : ${findInfoById(data.id, 'word')}
Definition : ${data.def}
Synonyms : ${data.syn}
Antonyms : ${data.ant}
Examples : ${data.ex}`))};`
      return template;

    case "propheader": template = `${console.log(chalk.bgGrey.white(`********************** ${propDefinitions[prop]} of ${word}: ********************** \n`))};`
      return template;

    case "prop_list": template = `${console.log(chalk.bgBlueBright.white(data.join(",")))};`; return template;

    case "prop_string": template = `${console.log(chalk.bgBlueBright.white(data))};`; return template;

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
