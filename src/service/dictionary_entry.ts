import type { DictionaryEntryStructure } from "../types/dictionary.ts"
export class DictionaryEntry {
    _data: DictionaryEntryStructure;
    constructor(data: DictionaryEntryStructure) {
        this._data = data;
    }
}