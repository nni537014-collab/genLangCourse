import type { DictionaryEntryStructure } from "../types/dictionary.ts"
export class DictionaryEntry {
    _data: DictionaryEntryStructure;
    constructor(data: DictionaryEntryStructure) {
        this._data = data;
    }
    isVerb() {
        //@todo refactor string
        return (this._data.pos === "verb")
    }
    hasFormOf(): [boolean, Set<string>] {
        let hasFormOf = false;
        let formsFound: string[] = [];
        let forms = new Set<string>;
        //@todo 
        if (this._data.formof) {
            console.log(this._data, "formof exiting")
            process.exit()
        }
        // if (entry.tags?.includes("form-of"))
        //     hasFormOf = true;
        this._data.senses?.map((sense) => {
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

    hasTranslations() {

        if (Array.isArray(this._data.translations)
            && this._data.translations.length > 0) {
            return true;
        }
    }
}