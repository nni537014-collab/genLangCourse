export type JsonPrimitive = string | number | boolean | null;

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;
export interface ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue):JsonValue | JsonValue[]
  getSupportedLibrary(): string;
}
export interface H5pGenerator {
    generate(base: TranslationPair[], template: JsonValue): JsonValue | JsonValue[]
    getSupportedLibrary(): string;
}

export const writeError = {
    NO_ERROR: "NO_ERROR",
    ERROR: "ERROR"
} as const;
export type WriteError = typeof writeError[keyof typeof writeError]; 
export interface Writer{
    writeDirName: string;
    write(generated: JsonValue, index: number):WriteError
}
export const loadStyle = {
    LOAD_INITIAL: "LOAD_INITIAL",
    LOAD_FROM_DISK: "LOAD_FROM_DISK"
} as const;
export type LoadStyle = typeof loadStyle[keyof typeof loadStyle]

export type courseGenConfig = {
  assetDirectoryName: string;
  outDirectoryName: string;
  chunkSize: number;
}

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
    tags?: string[];
    translations: DictionaryTranslation[] | undefined;
}
export type SenseBase = {
    form_of: string[],
}
export type Sense = SenseBase & any;
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
