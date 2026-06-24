import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename } from "./../utils.ts"

export class BlanksGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
     return template;
     /**
     params
"questions": ["<p>oslo is the capital of *norway*<\/p>"]
    */
    
  }
  getSupportedLibrary(): string {
    return "H5P.Blanks"; //@todo 
  }
}

