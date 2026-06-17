import type { TranslationPair } from "../types/types.ts";
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
    expand(base: TranslationPair[]) {
        return base.map(this.expandTranslationPair);
    }
    expandTranslationPair(tp: TranslationPair, i: number, data: TranslationPair[]) {
        //get words from translation
        const words = this.getWords(tp.translation);
        const translatedWords = this.getTranslatedWords(words);
        //get translation for word
        //if translation for word add to 
        const prependlist: TranslationPair[] = [];
        data.splice(i, 0, ...prependlist)
        prependlist.length
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
    getTranslatedWord(word: string) {
      return this.dictionary.findExactTranslations(word, "en-EN");

    }
}

