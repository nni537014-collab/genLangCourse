import { clearPreviousGeneratedData } from "./service/utils.ts"
import { Dictionary } from "./service/dictionary.ts"
import { PairsWordExpander } from "./service/pairsWordExpander.ts"
import { Pairs } from "./service/pairs.ts"
class CourseCreator {
  constructor() {

  }
  prepareBaseDataFromAssets() {

  }
  extendBaseData() {

  }

}

class DataExtenderImage {
  constructor() {

  }
}

class DataExtenderAudio {
  constructor() {

  }
}


clearPreviousGeneratedData();
const MODES = {
  find: "find",
  run: "run"


} as const;
type WordSearchItem = {word: string; logTranslations?: boolean}
type WordSearchList = WordSearchItem[];
type Modes = typeof MODES[keyof typeof MODES]
const mode = MODES.find as Modes;

const words: WordSearchList = [
  {word:"sonreír", logTranslations: true},
  {word: "sonreir", logTranslations: true}
]
switch (mode) {
  case MODES.find: {
    const dictionary = await Dictionary.create("es");
    words.forEach((wordSearchItem) => {
      const results = dictionary.findByWord(wordSearchItem.word);
      console.log(results);
      console.log(`finished logging word: ${wordSearchItem.word}`)
      if(wordSearchItem.logTranslations){
          results.forEach((entry)=>{
            entry.translations?.forEach((trans)=>{
              console.log(trans);
            })
          })
          
      }
    })
    break;
  }
  case MODES.run: {
    const expander = await PairsWordExpander.create("es");
    const pairs = new Pairs(expander);
    //console.log(pairs.getPairs());
    console.log("pairs length:", pairs.getPairs().length);

  }

}


//  dictionary.findByWord("casa").map((entry)=>{
//   if(entry.pos === "verb"){
//     console.log(entry);
//   }
//  });
//  const res = dictionary.findExactTranslations("casa", "en");
//  res.map((entry)=>{
//    entry.translations?.map((tr)=>{
//     console.log(tr);
//    })
//  })

// console.log(details.length);
// details.map((entry) => {
//   if (entry.pos !== "verb") return;
//   const [hasFormOf, formFound] = dictionary.hasFormOf(entry);
//   console.log("has form-of", hasFormOf, formFound);
//   console.log(entry)
//   if (entry.senses) {
//     entry.senses.map((sense) => {
//       console.log(sense);
//     })
//   }
// })



// const pwe = await PairsWordExpander.create("es");
// pwe.getTranslatedWords(["hola", "amigo"]).map((entry) => {
//     entry.translations?.map((trans) => {
//         console.log(trans);
//     })
// })