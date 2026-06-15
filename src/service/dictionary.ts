import { createReadStream } from "fs";
import { getAssetDictionaryPath } from "./utils.ts"
import readline from "readline";

type DictionaryTranslation = {
    word: string,
    lang_code: string,
    lang: string,
    sense_index: string | undefined
}
export type DictionaryEntry = {
    word: string;
    pos: string;
    translations: DictionaryTranslation[] | undefined;
}
export const loadFromDisk = async (): Promise<DictionaryEntry[]> => {
    const ret: DictionaryEntry[] = [];

    const rl = readline.createInterface({
        input: createReadStream(getAssetDictionaryPath()),
        crlfDelay: Infinity
    });

    return new Promise((resolve, reject) => {
        rl.on("line", line => {
            const parsed = processLine(line);
            if (parsed) ret.push(parsed);
        });

        rl.on("close", () => resolve(ret));
        rl.on("error", reject);
    });
};
function processLine(line: string): DictionaryEntry | undefined{
    //remove empty lines
    if (!line.trim()) return;

    try {
        const obj = JSON.parse(line);
        //@todo validate
        return {
          word: obj.word,
          pos: obj.pos,
          translations: obj.translations
        }
        return obj;
       
    } catch (err) {
        console.error("Bad JSON:", err);
        return undefined;
    }
}

export class Dictionary {
    // uniqueWordsInCards: Set<string>;
    _data: DictionaryEntry[];

    constructor(data: DictionaryEntry[]) {
        this._data = data;
        //console.log("dictionary length", this._data.length)
   
    }
    static async create(){
        const data = await loadFromDisk();
        return new Dictionary(data);
    }
    findByWord(word: string){
        return this._data.filter((entry)=>{
          return (word === entry.word)
        })
    }
    findExactTranslations(word: string){
      return this.findByWord(word).filter((entry)=>{
          if (entry.translations)
            return true
          
      })  
    }

}

// const dictionary = await Dictionary.create();
// console.log(dictionary.findByWord("casa").length);
// console.log(dictionary.findExactTranslations("tracion"))