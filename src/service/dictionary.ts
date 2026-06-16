import { createReadStream } from "fs";
import { getAssetDictionaryPath } from "./utils.ts"
import readline from "readline";
import type {
    DictionaryEntry,
} from "./../types/types.ts"

export const loadFromDisk = async (langCode: string): Promise<DictionaryEntry[]> => {
    const ret: DictionaryEntry[] = [];

    const rl = readline.createInterface({
        input: createReadStream(getAssetDictionaryPath()),
        crlfDelay: Infinity
    });

    return new Promise((resolve, reject) => {
        rl.on("line", line => {
            const parsed = processLine(line);
            if (parsed && parsed.lang_code === langCode) ret.push(parsed);
        });

        rl.on("close", () => resolve(ret));
        rl.on("error", reject);
    });
};


function processFilteredLine(line: string): DictionaryEntry | undefined {
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
function processLine(line: string): DictionaryEntry | undefined {
    //remove empty lines
    if (!line.trim()) return;

    try {
        const obj = JSON.parse(line);
       
        //@todo validate
        return {
            word: obj.word,
            pos: obj.pos,
            senses: Array.isArray(obj.senses) ? obj.senses : undefined,
            translations:  Array.isArray(obj.translations) ? obj.translations : undefined 
        }
    } catch (err) {
        console.error("Bad JSON:", err);
        return undefined;
    }
}

export class Dictionary {
    // uniqueWordsInCards: Set<string>;
    _data: DictionaryEntry[];
    langCode: string;
    constructor(langCode: string, data: DictionaryEntry[]) {
        this._data = data;
        this.langCode = langCode;
        //console.log("dictionary length", this._data.length)

    }
    static async create(langCode: string) {
        const data = await loadFromDisk(langCode);
        return new Dictionary(langCode, data);
    }
    seekExtraDetail(entry: DictionaryEntry) {

    }
    async loadWordDetailFromDisk(word: string | string[]): Promise<DictionaryEntry[]> {
        if(typeof word === "string") word = [word];
        const ret: DictionaryEntry[] = [];
        const rl = readline.createInterface({
            input: createReadStream(getAssetDictionaryPath()),
            crlfDelay: Infinity
        });

        return new Promise((resolve, reject) => {
            rl.on("line", line => {
                const parsed = processFilteredLine(line);
                
                if (parsed &&
                    parsed.lang_code === this.langCode &&
                    word.includes(parsed.word))
                    ret.push(parsed);
            });

            rl.on("close", () => resolve(ret));
            rl.on("error", reject);
        });
    };
    findByWord(word: string) {
        return this._data.filter((entry) => {
            return (word === entry.word)
        })
    }
    findExactTranslations(word: string, lang_code: string | undefined) {
        const translations = this.findByWord(word).filter((entry) => {
            if (entry.translations)

                return true

        })
        if (lang_code) {
            translations.map((entry, i, data) => {
                entry.translations = entry.translations?.filter((dictionaryTranslation) => {
                    return (dictionaryTranslation.lang_code === lang_code)
                })
            })
        }
        return translations;
    }

}

