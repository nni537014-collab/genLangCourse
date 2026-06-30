import { createReadStream } from "fs";
import { paths } from "../utils/paths.ts"
import { createInterface } from "readline";
import type {
    DictionaryEntry,
} from "./../types/types.ts"
import { totalmem } from "os";

const readlineCreateInterface = () => {
    return createInterface({
        input: createReadStream(paths.getAssetDictionary()),
        crlfDelay: Infinity
    });
}
export const loadFromDisk = async (langCode: string): Promise<DictionaryEntry[]> => {
    const ret: DictionaryEntry[] = [];

    const rl = readlineCreateInterface();

    return new Promise((resolve, reject) => {
        rl.on("line", line => {
            const parsed = processLine(line);
            if (parsed &&
                parsed.lang_code === langCode) {
                ret.push(parsed);
                // console.log("line added");
            }
        });

        rl.on("close", () => resolve(ret));
        rl.on("error", reject);
    });
};



function processLine(line: string): DictionaryEntry | undefined {
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
            translations: Array.isArray(obj.translations) ? obj.translations : undefined,
            tags: Array.isArray(obj.tags) ? obj.tags : undefined
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
    processLine(line: string): DictionaryEntry | undefined {
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
    static hasTranslations(toTest: DictionaryEntry | DictionaryEntry[]) {
        if (!Array.isArray(toTest)) {
            toTest = [toTest];
        }
        for (let entry of toTest) {
            if (Array.isArray(entry.translations)
                && entry.translations.length > 0) {
                return true;
            } 
        }
        return false;
    }
    //@todo return formFound[]?
    static hasFormOf(entry: DictionaryEntry): [boolean, Set<string>] {
        let hasFormOf = false;
        let formsFound: string[] = [];
        let forms = new Set<string>;
        //@todo 
        if (entry.formof) {
            console.log(entry, "formof exiting")
            process.exit()
        }
        // if (entry.tags?.includes("form-of"))
        //     hasFormOf = true;
        entry.senses?.map((sense) => {
            if (sense.form_of) {
                sense.form_of.map((formOf: { word: string }) => {
                    hasFormOf = true;
                    forms.add(formOf.word)
                    // formsFound.push(formOf.word);
                })
            }
        })
        return [(forms.size > 0), forms];
    }
    findByWord(word: string) {
        return this._data.filter((entry) => {
            return (word === entry.word)
        })
    }
    findExactTranslations(word: string, lang_code: string | undefined) {
        const translations = this.findByWord(word)

        if (lang_code) {
            translations.map((entry, i, data) => {
                entry.translations = entry.translations?.filter((dictionaryTranslation) => {
                    return (dictionaryTranslation.lang_code === lang_code)
                })
            })
        }
        const ret = translations.filter((entry) => {
            if (entry.translations)
                return true
        })
        // console.log(`found ${ret.length} translations for word: ${word}`);
        return ret;
    }
    async findFormOf(word: string) {
        const wordDetails = await this.findByWord(word);
        let ret: string[] = [];
        wordDetails.map((wordDetail) => {
            const [hasFormOf, formFound] = Dictionary.hasFormOf(wordDetail);
            if (hasFormOf && typeof formFound === "string")
                ret.push(formFound);
        });
        return ret;
    }
    static isVerb(wordUnderTest: DictionaryEntry) {
        return (wordUnderTest.pos === "verb")
    }
}






























