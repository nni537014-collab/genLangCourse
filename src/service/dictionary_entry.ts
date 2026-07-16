import { 
  DictionaryEntryStructureElement,
  Translation 
} from "../types/dictionary/dictionary-entry-structure.ts";
export class DictionaryEntry {
  protected readonly _data: DictionaryEntryStructureElement;
  constructor(data: DictionaryEntryStructureElement) {
    this._data = data;
  }
  isVerb() {
    //@todo refactor string
    return this._data.pos === "verb";
  }
  hasFormOf(): [boolean, Set<string>] {
    // let hasFormOf = false;
    // const formsFound: string[] = [];
    const forms = new Set<string>();
    //@todo
    // if (this._data.formof) {
    //   console.log(this._data, "formof exiting");
    //   process.exit();
    // }
    // if (entry.tags?.includes("form-of"))
    //     hasFormOf = true;
    this._data.senses?.map((sense) => {
      if (sense.form_of) {
        sense.form_of.map((formOf: { word: string }) => {
          // hasFormOf = true;
          forms.add(formOf.word);
          // formsFound.push(formOf.word);
        });
      }
    });
    return [forms.size > 0, forms];
  }
  isWord(word: string) {
    return this._data.word === word;
  }
  getFilteredTranslation(langCode: string | undefined) {
    const res: Translation[] = [];
    if (typeof langCode === "string") {
      const filtered = this._data.translations?.filter(
        (det) => det.lang_code === langCode,
      );
      if (filtered) return filtered;
      else return res;
    } else {
      if (Array.isArray(this._data.translations))
        return this._data.translations;
      else return res;
    }
  }
  hasTranslations() {
    if (
      Array.isArray(this._data.translations) &&
      this._data.translations.length > 0
    ) {
      return true;
    }
  }
}
