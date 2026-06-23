import type {
  TranslationPair,
  JsonValue,
  contentGenerator,
  subContentGenerator
} from "./../../types/types.ts";

export class DialogGenerator implements subContentGenerator{
  generate(base: TranslationPair[]): JsonValue {
      return true;
  }
  getActionLibrary(): string {
      return "H5P.Dialog"; //@todo 
  }
}

