import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename } from "./../utils.ts"

export class DragTextGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
     return template;
/*
params
"textField": "Example one - replace *this* with\nexample two - repplace *that* with"
*/                  
    
  }
  getSupportedLibrary(): string {
    return "H5P.DragText"; //@todo 
  }
}

