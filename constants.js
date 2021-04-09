const wordData = {
  "Chair": {
    "id": 1,
    "def": "Chair Def",
    "ant": ["nchair1","nchair2"],
    "syn": ["chair1","chair2","chair3"],
    "ex": ["chairex1","chairex2"]
  },
  "Sofa": {
    "id": 2,
    "def": "Sofa Def",
    "ant": ["nsofa1","nsofa2","nsofa3"],
    "syn": ["sofa1","sofa2"],
    "ex": ["sofaex1","sofaex2"]
  },
  "Lamp": {
    "id": 3,
    "def": "Lamp Def",
    "ant": ["nlamp1","nlamp2"],
    "syn": ["lamp1","lamp2"],
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

module.exports = {
  wordData, props, propDefinitions
}
