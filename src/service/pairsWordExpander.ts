import type { DictionaryTranslation, TranslationPair } from "../types/types.ts";
import { Dictionary, } from "./dictionary.ts"
import type { DictionaryEntry } from "./../types/types.ts"
function splitAndClean(input: string): string[] {
    return input
        .trim()
        .split(/\s+/)                         // split on any whitespace
        .map(part => part.replace(/[^a-zA-Z]+$/g, "")) // remove non‑letters at END
        .map(part => part.trim())
        .filter(Boolean);                     // remove empty strings
}

export class PairsWordExpander {
    _words: Set<string>;
    dictionary: Dictionary;
    constructor(dictionary: Dictionary) {
        this._words = new Set<string>
        this.dictionary = dictionary;
    }
    static async create(langCode: string) {
        const dictionary = await Dictionary.create(langCode);
        return new PairsWordExpander(dictionary);
    }
    expand(data: TranslationPair[]) {
        const initialDataLength = data.length;
        console.log(`Initial data length: ${initialDataLength}`)
        for(let i = 0; i < data.length; i++){
            const tp = data[i];
            if(!tp) continue;
            const newTPs: TranslationPair[] = this.expandTranslationPair(tp);
            data.splice(i, 0, ...newTPs);
            i += newTPs.length;
            // console.log(`${newTPs.length} added`) 
        }
        console.log("words size: ",this._words.size)
        console.log(`add ${data.length - initialDataLength} translations`)
    }
    expandTranslationPair(tp: TranslationPair) {
        //get words from translation
        const words = this.getWords(tp.translation);
        // console.log(`getting translations for ${words.length} words`);
        const translationPairs: TranslationPair[] = [];
        // const translations: Record<string, DictionaryEntry[]> = {};
        words.map((word) => {
            const recordDetails = this.getTranslatedWord(word);
            if (recordDetails.length > 0){

                // translations[word] = recordDetails;
                // console.log("adding translation for", word, recordDetails)
                // recordDetails.map((detail)=>{
                //     detail.translations?.map((translation)=>{
                //         console.log(translation)
                //     })
                // })
                this.addTranslationPair(recordDetails, translationPairs);
            //@todo - have translations - use one to create tp
            } else {
                // console.log("finally"); process.exit();
                console.log("translations not found for word", word);
                const entries = this.dictionary.findByWord(word.toLowerCase());
                let verb: DictionaryEntry | undefined;
                for (let entry of entries) {
                    if (this.dictionary.isVerb(entry))
                        verb = entry;
                }
                if (verb) {
                    const [hasFormOf, formFound] = Dictionary.hasFormOf(verb);
                    if (typeof formFound === "string"
                        && formFound.length > 0) {
                            console.log("form found", formFound);
                        if (this._words.has(formFound)) return; //@todo check return
                        this._words.add(formFound);
                        const recordDetails = this.getTranslatedWord(formFound);
                        if (recordDetails) {
                            this.addTranslationPair(recordDetails, translationPairs);
                        }
                    }
                }

            }

            //@todo if no translations - find if word has "formOf"
            // if so find if formOf word has translations
            // if so add formOf word to _words and add translations 
        })
        //@todo add translations to data;
        return translationPairs;

    }
    addTranslationPair(recordDetails: DictionaryEntry[], translationPairs: TranslationPair[]) {

        const recordDetail = recordDetails.pop();

        let trans: string | undefined;
        let word: string | undefined;
        if (recordDetail) {
            trans = recordDetail.translations?.map(x => x.word).join(", ");
            word = recordDetail.word;
        }

        if (trans && word) {
            translationPairs.push({
                source: trans,
                translation: word
            })
            //@todo need index to position new element
        } else {
            console.warn("error", recordDetails, recordDetail, "error end")
        }
    }
    getWords(translation: string) {
        const words = splitAndClean(translation);
        return words.filter(word => {
            if (this._words.has(word)) {
                return false
            } else {
                this._words.add(word);
                return true;
            }
        })
     
    }
    //@todo remove string
    getTranslatedWord(word: string, langCode: string = "en") {
        return this.dictionary.findExactTranslations(word, langCode);

    }
}

