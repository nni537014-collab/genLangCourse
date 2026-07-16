import { createReadStream } from "fs";
import { paths } from "../utils/paths.ts";
import { createInterface } from "readline";
import type {
  // DictionaryEntryStructure,
  DictionaryTranslationStructure,
  // Sense,
} from "./../types/dictionary.ts";
import { DictionaryEntry } from "./dictionary_entry.ts";
import { DictionaryEntryStructureElement } from "../types/dictionary/dictionary-entry-structure.ts";

const readlineCreateInterface = () => {
  return createInterface({
    input: createReadStream(paths.getAssetDictionary()),
    crlfDelay: Infinity,
  });
};
export const loadFromDisk = async (
  langCode: string,
): Promise<[DictionaryEntryStructureElement[], DictionaryEntry[]]> => {
  const ret: DictionaryEntryStructureElement[] = [];
  const dictionaryEntries: DictionaryEntry[] = [];
  const rl = readlineCreateInterface();

  return new Promise((resolve, reject) => {
    rl.on("line", (line) => {
      const parsed = processLine(line);
      if (parsed && parsed.lang_code === langCode) {
        //@todo VALIDATION!!!!!
        ret.push(parsed);
        dictionaryEntries.push(new DictionaryEntry(parsed));
        // console.log("line added");
      }
    });

    rl.on("close", () => resolve([ret, dictionaryEntries]));
    rl.on("error", reject);
  });
};

function processLine(line: string): DictionaryEntryStructureElement | undefined {
  //remove empty lines
  if (!line.trim()) return;

  try {
    const obj = JSON.parse(line);
    // if(!obj.translations){
    //    const [hasFormOf, formOf] = Dictionary.hasFormOf(obj);
    //    if(hasFormOf && obj.pos === "verb"){
    //      console.log("form of", obj.word, formOf);
    //    }
    // }
    //@todo validate
    return {
      word: obj.word,
      pos: obj.pos,
      lang_code: obj.lang_code,
      senses: Array.isArray(obj.senses) ? obj.senses : undefined,
      translations: Array.isArray(obj.translations)
        ? obj.translations
        : undefined,
      tags: Array.isArray(obj.tags) ? obj.tags : undefined,
    };
  } catch (err) {
    console.error("Bad JSON:", err);
    return undefined;
  }
}
export async function DictionaryFactory(langCode: string) {
  const [data, dictionaryEntries] = await loadFromDisk(langCode);
  return new Dictionary(langCode, data, dictionaryEntries);
}
export class Dictionary {
  // uniqueWordsInCards: Set<string>;
  _data: DictionaryEntryStructureElement[];
  _dictionaryEntries: DictionaryEntry[];
  langCode: string;
  constructor(
    langCode: string,
    data: DictionaryEntryStructureElement[],
    dictionaryEntries: DictionaryEntry[],
  ) {
    this._data = data;
    this._dictionaryEntries = dictionaryEntries;
    this.langCode = langCode;
    //console.log("dictionary length", this._data.length)
  }

  // async loadWordDetailFromDisk(word: string | string[]): Promise<DictionaryEntry[]> {
  //     if (typeof word === "string") word = [word];
  //     const ret: DictionaryEntry[] = [];
  //     const rl = readlineCreateInterface();
  //     return new Promise((resolve, reject) => {
  //         rl.on("line", line => {
  //             const parsed = processLine(line);
  //             if (parsed &&
  //                 parsed.lang_code === this.langCode) {
  //                 ret.push(parsed);
  //                 // console.log("line added");
  //             }
  //         });

  //         rl.on("close", () => resolve(ret));
  //         rl.on("error", reject);
  //     });
  // }
  processLine(line: string): DictionaryEntryStructureElement | undefined {
    //remove empty lines
    if (!line.trim()) return;
    try {
      const obj = JSON.parse(line);
      //@todo validate
      return obj;
    } catch (err) {
      console.error("Bad JSON:", err);
      return undefined;
    }
  }
  // static hasTranslations(
  //   toTest: DictionaryEntryStructure | DictionaryEntryStructure[],
  // ) {
  //   if (!Array.isArray(toTest)) {
  //     toTest = [toTest];
  //   }
  //   for (let entry of toTest) {
  //     if (Array.isArray(entry.translations) && entry.translations.length > 0) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  //@todo return formFound[]?
  // static hasFormOf(entry: DictionaryEntryStructure): [boolean, Set<string>] {
  //   let hasFormOf = false;
  //   let formsFound: string[] = [];
  //   let forms = new Set<string>();
  //   //@todo
  //   if (entry.formof) {
  //     console.log(entry, "formof exiting");
  //     process.exit();
  //   }
  //   // if (entry.tags?.includes("form-of"))
  //   //     hasFormOf = true;
  //   entry.senses?.map((sense: Sense) => {
  //     if (sense.form_of) {
  //       sense.form_of.map((formOf) => {
  //         hasFormOf = true;
  //         forms.add(formOf.word);
  //         // formsFound.push(formOf.word);
  //       });
  //     }
  //   });
  //   return [forms.size > 0, forms];
  // }
  findByWord(word: string) {
    return this._dictionaryEntries.filter((de) => de.isWord(word));
  }
  findExactTranslations(word: string, langCode: string | undefined) {
    const des = this.findByWord(word);
    const r: [DictionaryTranslationStructure[], DictionaryEntry][] = des.map(
      (de) => {
        return [de.getFilteredTranslation(langCode), de];
      },
    );
    return r;
    // if (langCode) {
    //   des.forEach((de, i, data) => {
    //     de._data.translations = de._data.translations?.filter(
    //       (dictionaryTranslation) => {
    //         return dictionaryTranslation.lang_code === langCode;
    //       },
    //     );
    //   });
    // }
    // return des.filter((de) => {
    //   if (de._data.translations) return true;
    // });
    // return ret.map((des) => {
    //   return new DictionaryEntry(des);
    // });
    // console.log(`found ${ret.length} translations for word: ${word}`);
    // return ret;
  }
  async findFormOf(word: string) {
    const des = this.findByWord(word);
    const ret: string[] = [];
    des.map((de) => {
      const [hasFormOf, formFound] = de.hasFormOf();
      if (hasFormOf && typeof formFound === "string") ret.push(formFound);
    });
    return ret;
  }
  static isVerb(wordUnderTest: DictionaryEntryStructureElement) {
    return wordUnderTest.pos === "verb";
  }
}
