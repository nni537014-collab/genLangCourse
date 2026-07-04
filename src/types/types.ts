export type JsonPrimitive = string | number | boolean | null;

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

export type LibraryNames =
  | "H5P.Blanks"
  | "H5P.MultiMediaChoice"
  | "H5P.Dialogcards"
  | "H5P.SingleChoiceSet"
  | "H5P.MultiChoice"
  | "H5P.MultiMediaChoice"
  | "H5P.DragText"
  | "H5P.CoursePresentation";
export const libraryNames = [
  "H5P.Blanks",
  "H5P.MultiMediaChoice",
  "H5P.Dialogcards",
  "H5P.SingleChoiceSet",
  "H5P.MultiChoice",
  "H5P.MultiMediaChoice",
  "H5P.DragText",
  "H5P.CoursePresentation",
] as const satisfies readonly LibraryNames[];

export type SourceOrTranslation = "source" | "translation";
export type ArchivedPaths = Set<string>;
export type WrittenH5PArchive = Record<LibraryNames, ArchivedPaths>;

export type PairsFileWriterConfig = {
  dir?: string;
  name?: string;
};
interface Generator {
  getSupportedLibrary(): LibraryNames;
}
export type segmentId = string;
export type segmentArchivedPaths = Record<LibraryNames, ArchivedPaths>;
export type AllSegmentArchivedPaths = Record<segmentId, segmentArchivedPaths>;
export interface Creator<T> {
  segmentedArchivedPaths: Record<segmentId, segmentArchivedPaths>;
  chunk(): T[];
  runGenerators(
    chunk: T,
    archive: WrittenH5PArchive,
  ): Record<LibraryNames, ArchivedPaths>;
  map(allPaths: AllSegmentArchivedPaths): [Error | undefined];
}
export interface ContentGenerator extends Generator {
  generate(
    base: TranslationPair[],
    template: JsonValue,
  ): JsonValue | JsonValue[];
}
export interface H5pGenerator extends Generator {
  generate(index: number, template: JsonValue): JsonValue | JsonValue[];
}
export type AudioFileName = `${string}.mp3`;

export const writeError = {
  NO_ERROR: "NO_ERROR",
  ERROR: "ERROR",
} as const;
export type WriteError = (typeof writeError)[keyof typeof writeError];
export interface Writer {
  getSupportedLibrary(): LibraryNames;
  writeDirName: string;
  archivedPaths: ArchivedPaths;
  write(content: JsonValue, h5p: JsonValue, index: number): WriteError;
}
export type GenSet = {
  content: ContentGenerator;
  h5p: H5pGenerator;
  writer: Writer;
};
export const loadStyle = {
  LOAD_INITIAL: "LOAD_INITIAL",
  LOAD_FROM_DISK: "LOAD_FROM_DISK",
} as const;
export type LoadStyle = (typeof loadStyle)[keyof typeof loadStyle];

export type courseGenConfig = {
  assetDirectoryName: string;
  outDirectoryName: string;
  chunkSize: number;
};

export type TranslationPair = {
  source: string;
  translation: string;
};
export type TranslationPairAudioName = {
  source: string;
  translation: string;
};
export type TranslationPairImageName = {
  source: string | undefined;
  translation: string | undefined;
};
export type DialogCardData = {
  translationPair: TranslationPair;
  image: TranslationPairImageName;
  audio: TranslationPairAudioName;
};

export type TranslationPairChunk = TranslationPair[];
export type TranslationPairChunks = TranslationPairChunk[];

export type SingleCoiceTranslationPairs = {
  correct: TranslationPair;
  wrong: TranslationPair[];
};
export type MultiMediaChoice = {
  correct: TranslationPair;
  correctAudio: TranslationPairAudioName;
  wrong: TranslationPair[];
  wrongAudio: TranslationPairAudioName[];
};
export type blankWordsIncluded = Set<string>;
export type SingleCoiceTranslationPairsChunk = SingleCoiceTranslationPairs[];
export type SingleCoiceTranslationPairsChunkDataSet =
  SingleCoiceTranslationPairsChunk[];
