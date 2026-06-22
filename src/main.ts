import { clearPreviousGeneratedData } from "./service/utils.ts"
import { Dictionary } from "./service/dictionary.ts"
import { PairsWordExpander } from "./service/pairsWordExpander.ts"
import { loadStyle, Pairs, PairsFileReaderWriter } from "./service/pairs.ts"

 
interface contentGenerator   {
   generate():boolean;  
}

type courseGenConfig = {
  assetDirectoryName: string;
  outDirectoryName: string;
}
class CourseCreator {
  _contentGenerator: contentGenerator[];
  _pairs: Awaited<ReturnType<typeof CourseCreator.prepareBaseDataFromAssets>>;
  constructor(contentGenerators: contentGenerator[], pairs: Pairs) {
      this._pairs = pairs;
      this._contentGenerator = contentGenerators;
  }
  
  static  async create(){
    return new CourseCreator([], await CourseCreator.prepareBaseDataFromAssets());
  }
  
  static async prepareBaseDataFromAssets() {
    const expander = await PairsWordExpander.create("es");
    const pairs = new Pairs(expander, 
      loadStyle.LOAD_FROM_DISK, 
      new PairsFileReaderWriter({
        dir: "tmp",
        name: "pairs.json"
      }));
    //console.log(pairs.getPairs());
    console.log("pairs length:", pairs.getPairs().length);
    return pairs;

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
const mode = MODES.run as Modes;

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
    const pairs = new Pairs(expander, 
      loadStyle.LOAD_FROM_DISK, 
      new PairsFileReaderWriter({
        dir: "tmp",
        name: "pairs.json"
      }));
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
