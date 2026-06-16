
export type DictionaryTranslation = {
    word: string,
    lang_code: string,
    lang: string,
    sense_index: string | undefined
}
export type DictionaryEntry = {
    word: string;
    pos: string;
    lang_code?: string;
    senses?: any[];
    translations: DictionaryTranslation[] | undefined;
}
export type TranslationPair = {
    source: string;
    translation: string;
}
export type TranslationPairAudioName = {
    source: string;
    translation: string;
}
export type TranslationPairImageName = {
    source: string | undefined;
    translation: string | undefined;
}
export type DialogCardData = {
    translationPair: TranslationPair;
    image: TranslationPairImageName;
    audio: TranslationPairAudioName;
}

export type TranslationPairChunk = TranslationPair[];
export type TranslationPairChunks = TranslationPairChunk[];

export type SingleCoiceTranslationPairs = {
    correct: TranslationPair;
    wrong: TranslationPair[];
}
export type MultiMediaChoice = {
  correct: TranslationPair;
  correctAudio: TranslationPairAudioName;
  wrong: TranslationPair[];
  wrongAudio: TranslationPairAudioName[]; 
}
export type blankWordsIncluded = Set<string>;
export type SingleCoiceTranslationPairsChunk = SingleCoiceTranslationPairs[];
export type SingleCoiceTranslationPairsChunkDataSet = SingleCoiceTranslationPairsChunk[];
