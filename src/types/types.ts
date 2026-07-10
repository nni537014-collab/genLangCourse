import type { BlanksGenerator } from "../service/generators/content/blanks.ts";
import type { CoursePresentationGenerator } from "../service/generators/content/course_presentation.ts";
import type { DialogCardsGenerator } from "../service/generators/content/dialog_cards.ts";
import type { DragTextGenerator } from "../service/generators/content/drag_text.ts";
import type { MultiChoiceGenerator } from "../service/generators/content/multi_choice.ts";
import type { MultiMediaChoiceGenerator } from "../service/generators/content/multi_media_choice.ts";
import type { SingleChoiceSetGenerator } from "../service/generators/content/single_choice_set.ts";
import type { H5PJSON } from "./H5P/h5p.ts";

export type JsonPrimitive = string | number | boolean | null;

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

//@todo check if dialogcards should be camel case
export type LibraryNames =
  | "H5P.Blanks"
  | "H5P.MultiMediaChoice"
  | "H5P.Dialogcards"
  | "H5P.SingleChoiceSet"
  | "H5P.MultiChoice"
  | "H5P.MultiMediaChoice"
  | "H5P.DragText"
  | "H5P.CoursePresentation";
export type CoursePresentationSlideLibraries = Extract<
  LibraryNames, 
  "H5P.MultiChoice" | "H5P.MultiMediaChoice" | "H5P.DragText"
>;
export const coursePresentationSlideLibraries = [
  "H5P.MultiMediaChoice",
  "H5P.MultiChoice",
  "H5P.DragText",
] as const satisfies readonly CoursePresentationSlideLibraries[];
export const libraryNames = [
  "H5P.Blanks",
  "H5P.MultiMediaChoice",
  "H5P.Dialogcards",
  "H5P.SingleChoiceSet",
  "H5P.MultiChoice",

  "H5P.DragText",
  "H5P.CoursePresentation",
] as const satisfies readonly LibraryNames[];

export interface generatorMapping {
  "H5P.Blanks": BlanksGenerator;
  "H5P.SingleChoiceSet": SingleChoiceSetGenerator;
  "H5P.MultiMediaChoice": MultiMediaChoiceGenerator;
  "H5P.Dialogcards": DialogCardsGenerator;
  "H5P.MultiChoice": MultiChoiceGenerator;
  "H5P.DragText": DragTextGenerator;
  "H5P.CoursePresentation": CoursePresentationGenerator;
}
export type CoursePresentationLibraryNames = Exclude<LibraryNames, "H5P.CoursePresentation">;

export type CoursePresentationGeneratorRegistry = { [K in CoursePresentationLibraryNames]: generatorMapping[K] };
//@TODO - consider using a Map instead of an object for generatorRegistry, so that we can use the LibraryNames type as the key type
//@todo move to better place, e.g. service/generators/generatorRegistry.ts

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
export interface ContentGenerator<TTemplate extends object = object> extends Generator {
  generate(
    base: TranslationPair[],
    template: TTemplate,
  ): TTemplate | TTemplate[];
}
export interface H5pGenerator extends Generator {
  generate(index: number, template: H5PJSON): H5PJSON;
}
export type AudioFileName = `${string}.mp3`;

export const writeError = {
  NO_ERROR: "NO_ERROR",
  ERROR: "ERROR",
} as const;
export type WriteError = (typeof writeError)[keyof typeof writeError];
export interface Writer<TContent extends object = object> {
  getSupportedLibrary(): LibraryNames;
  writeDirName: string;
  archivedPaths: ArchivedPaths;
  write(content: TContent, h5p: H5PJSON, index: number): WriteError;
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
