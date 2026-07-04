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
  senses?: any[];
  tags?: string[];
  translations: DictionaryTranslationStructure[] | undefined;
};
export type SenseBase = {
  form_of: string[];
};
export type Sense = SenseBase & any;