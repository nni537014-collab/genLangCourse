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
        for(let i = 0; i < data.length; i++){
            const tp = data[i];
            if(!tp) continue;
            this.expandTranslationPair({tp, i, data});
        }
    }
    expandTranslationPair(p: {tp: TranslationPair, i: number, data: TranslationPair[]}) {
        //get words from translation
        const words = this.getWords(p.tp.translation);
        const addTranslationPairs: TranslationPair[] = [];
        const translations: Record<string, DictionaryEntry[]> = {};
        words.map((word) => {
            const recordDetails = this.getTranslatedWord(word);
            if (recordDetails){
                translations[word] = recordDetails;
                this.addTranslationPair(recordDetails, addTranslationPairs);
            //@todo - have translations - use one to create tp
            } else {
                const entries = this.dictionary.findByWord(word);
                let verb: DictionaryEntry | undefined;
                for (let entry of entries) {
                    if (this.dictionary.isVerb(entry))
                        verb = entry;
                }
                if (verb) {
                    const [hasFormOf, formFound] = Dictionary.hasFormOf(verb);
                    if (typeof formFound === "string"
                        && formFound.length > 0) {
                        if (this._words.has(formFound)) return; //@todo check return
                        this._words.add(formFound);
                        const recordDetails = this.getTranslatedWord(formFound);
                        if (recordDetails) {
                            this.addTranslationPair(recordDetails, addTranslationPairs);

                            // //@todo - have translations - use one to create tp
                            // const rec = recordDetails[0];
                            // if(rec && rec.translations){
                            //     const trans = rec.translations[0];
                            //     if(trans){
                            //         const altLangWord = trans.word;
                            //     }
                            // }
                        }
                    }
                }
            }

            //@todo if no translations - find if word has "formOf"
            // if so find if formOf word has translations
            // if so add formOf word to _words and add translations 
        })
        //@todo add translations to data;
        return translations;
        //get translation for word
        //if translation for word add to 
        // const prependlist: TranslationPair[] = [];
        // data.splice(i, 0, ...prependlist)
        // prependlist.length
    }
    addTranslationPair(recordDetails: DictionaryEntry[], addTranslationPairs: TranslationPair[]) {

        if (!) return
        const recordDetail = recordDetails.pop();

        let trans: DictionaryTranslation | undefined;
        let word: string | undefined
        if (recordDetail) {
            trans = recordDetail.translations?.pop();
            word = recordDetail.word;
        }

        if (trans && word) {
            addTranslationPairs.push({
                source: trans.word,
                translation: word
            })
            //@todo need index to position new element
        }
    }
    getWords(translation: string) {
        const words = splitAndClean(translation);
        words.filter(word => {
            if (this._words.has(word)) {
                return false

            } else {
                this._words.add(word);
                return true;

            }
        })

        return words;
    }
    getTranslatedWord(word: string, langCode: string = "en-EN") {
        return this.dictionary.findExactTranslations(word, langCode);

    }
}

