import type { DictionaryTranslation, TranslationPair } from "../../types/types.ts";
import { Dictionary, } from "../dictionary.ts"
import type { DictionaryEntry } from "../../types/types.ts"
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
    _untranslatedWords: Set<string>
    dictionary: Dictionary;
    constructor(dictionary: Dictionary) {
        this._words = new Set<string>;
        this._untranslatedWords = new Set<string>
        this.dictionary = dictionary;
    }
    static async create(langCode: string) {
        const dictionary = await Dictionary.create(langCode);
        return new PairsWordExpander(dictionary);
    }
    expand(data: TranslationPair[]) {
        const initialDataLength = data.length;
        console.log(`Initial data length: ${initialDataLength}`)
        for (let i = 0; i < data.length; i++) {
            const tp = data[i];
            if (!tp) continue;
            const newTPs: TranslationPair[] = this.expandTranslationPair(tp);
            data.splice(i, 0, ...newTPs);
            i += newTPs.length;
            // console.log(`${newTPs.length} added`) 
        }
        data.forEach((tp, i, data)=>{
            
            data.forEach((tpToTest, j) => {
                if(tpToTest.translation === tp.translation 
                    && tpToTest.source === tp.source
                    && i !== j
                ){
                    //absolute duplicate
                     //remove one with higher index
                }
                 if(tpToTest.translation === tp.translation 
                    && tpToTest.source !== tp.source
                ){
                    //partial duplicate
                    //keep one with longer source
                }
                    
            })
        })
        console.log("words size: ", this._words.size);
        console.log(`add ${data.length - initialDataLength} translations`);
        console.log("untranslated words size: ", this._untranslatedWords.size);
    }
    expandTranslationPair(tp: TranslationPair) {
        //get words from translation
        const words = this.getWords(tp.translation);
        // console.log(`getting translations for ${words.length} words`);
        const translationPairs: TranslationPair[] = [];
        // const translations: Record<string, DictionaryEntry[]> = {};
        const expandWord = (word: string) => {
            let expanded = false;
            const recordDetails = this.getTranslatedWord(word);
            if (Dictionary.hasTranslations(recordDetails)) {
                expanded = this.addTranslationPair(recordDetails, translationPairs);
                //@todo - have translations - use one to create tp
            } else {
                // console.log("finally"); process.exit();
                console.log("translations not found for word", word);
                const entries = this.dictionary.findByWord(word.toLowerCase());
                let verb: DictionaryEntry | undefined;
                let oneEntryHasFormOf = false;
                for (let entry of entries) {
                    const [hasFormOf, forms] = Dictionary.hasFormOf(entry);
                    if (hasFormOf) {
                        expanded = true;
                        console.log("form found", forms);
                        forms.forEach((form) => {
                            if (this._words.has(form)) return; //@todo check return
                            this._words.add(form);
                            const recordDetails = this.getTranslatedWord(form);
                            if (Dictionary.hasTranslations(recordDetails)) {
                                expanded = this.addTranslationPair(recordDetails, translationPairs);
                            }
                        })

                    }
                }

            }
            return expanded;
            //@todo if no translations - find if word has "formOf"
            // if so find if formOf word has translations
            // if so add formOf word to _words and add translations 
        }
        const expandedWords = words.map(expandWord);
        expandedWords.forEach((expanded, i) => {
            function removeEnding(str: string, endings: string[]): string {
                const match = endings.find(e => str.endsWith(e));
                return match ? str.slice(0, -match.length) : str;
            }
            const spanishCliticEndings = [
                // Single clitics
                "me", "te", "se", "lo", "la", "le", "nos", "os", "los", "las", "les",

                // Double clitics (indirect + direct)
                "melo", "mela", "melos", "melas",
                "telo", "tela", "telos", "telas",
                "selo", "sela", "selos", "selas",
                "noslo", "nosla", "noslos", "noslas",
                "oslo", "osla", "oslos", "oslas",
                "leslo", "lesla", "leslos", "leslas" // rare but grammatically possible
            ];
            if (!expanded) {
                const needToModify = words[i];
                if (needToModify) {
                    const modifiedReflexiveStripped = removeEnding(needToModify, spanishCliticEndings);
                    if (needToModify.endsWith("s")) {
                        const modified = needToModify.slice(0, -1);

                        expandedWords[i] = expandWord(modified);
                    } else if (needToModify !== modifiedReflexiveStripped) {
                        expandedWords[i] = expandWord(modifiedReflexiveStripped);
                    }
                    //remove trailing "s" - 
                    //remove reflective verb structure           
                }
            }
        })
        expandedWords.forEach((expanded, i) => {
            if (!expanded) {
                const word = words[i];
                if (word)
                    this._untranslatedWords.add(word);
            }
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
            return true;
            //@todo need index to position new element
        } else {
            console.warn("error", recordDetails, recordDetail, "error end");
            return false;
        }
    }
    // returns lower case words 
    getWords(translation: string) {
        const words = splitAndClean(translation).map(word => word.toLowerCase());
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

