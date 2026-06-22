import { clearPreviousGeneratedData } from "./service/utils.ts"
import { Dictionary } from "./service/dictionary.ts"
import { PairsWordExpander } from "./service/pairsWordExpander.ts"
import { loadStyle, Pairs, PairsFileReaderWriter } from "./service/pairs.ts"
import type { TranslationPair } from "./types/types.ts";

/**
 * @todo move somewhere, types? 
 */
interface contentGenerator {
  generate(base: TranslationPair[]): boolean;
}
/**
 * @todo move somewhere, types or config? 
 */
type courseGenConfig = {
  assetDirectoryName: string;
  outDirectoryName: string;
  chunkSize: number;
}
class CoursePresentationGenerator implements contentGenerator {
  generate(base: Pairs) {
    //get template
    //trasverse template for know generatable types
    //generate for base data

    return false;
  }
}
/**
 * main class that kick's things off
 * maybe going to run everything in constructor
 * additional methods for report generation? 
 */
class CourseCreator {
  _config: courseGenConfig;
  _contentGenerator: contentGenerator[];
  /**
   * this structure is data that will be passed to generators
   */
  _pairs: Awaited<ReturnType<typeof CourseCreator.prepareBaseDataFromAssets>>;
  _pairsChunks: TranslationPair[][] = [];
  /**
 * static factory
 * @param config 
 * @returns 
 */
  static async create(config: courseGenConfig) {
    return new CourseCreator(
      config,
      [],
      await CourseCreator.prepareBaseDataFromAssets()
    );
  }
  constructor(config: courseGenConfig, contentGenerators: contentGenerator[], pairs: Pairs) {
    this._config = config;
    this._pairs = pairs;
    this.chunkPairs();
    this._contentGenerator = contentGenerators;
    for (let i = 0; i < this._pairsChunks.length; i++) {
      const chunk = this._pairsChunks[i];
      if (chunk) {
        this.runGenerators(chunk);
      }
    }
    //iterate chunks
    //    call generators
  }
  runGenerators(chunk: TranslationPair[]) {
    this._contentGenerator.forEach((generator) => { generator.generate(chunk) })
    throw new Error("Method not implemented.");
  }
  chunkPairs() {
    const data = this._pairs.getPairs();
    let i = 0;
    let chunkSize = this._config.chunkSize;
    this._pairsChunks = []; //reset
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      this._pairsChunks.push(chunk);
    }

    return;
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
type WordSearchItem = { word: string; logTranslations?: boolean }
type WordSearchList = WordSearchItem[];
type Modes = typeof MODES[keyof typeof MODES]
const mode = MODES.run as Modes;

const words: WordSearchList = [
  { word: "sonreír", logTranslations: true },
  { word: "sonreir", logTranslations: true }
]


switch (mode) {
  case MODES.find: {
    const dictionary = await Dictionary.create("es");
    words.forEach((wordSearchItem) => {
      const results = dictionary.findByWord(wordSearchItem.word);
      console.log(results);
      console.log(`finished logging word: ${wordSearchItem.word}`)
      if (wordSearchItem.logTranslations) {
        results.forEach((entry) => {
          entry.translations?.forEach((trans) => {
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
