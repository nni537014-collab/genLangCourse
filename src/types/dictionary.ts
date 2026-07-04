export type DictionaryTranslationStructure = {
  word: string;
  lang_code: string;
  lang: string;
  sense_index: string | undefined;
};
export type DictionaryEntryStructure = {
  word: string;
  pos: string;
  lang_code?: string;
  senses?: Sense[];
  tags?: string[];
  translations: DictionaryTranslationStructure[] | undefined;
};
export type SenseBase = {
  form_of: { word: string }[] ;
};
export type Sense = SenseBase// & any;