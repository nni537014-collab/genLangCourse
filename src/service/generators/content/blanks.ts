import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "../../../types/types.ts";
// import { md5Filename } from "../../utils/utils.ts"
import su from "../../../utils/string.ts"

export class BlanksGenerator implements ContentGenerator {
    /**
    params
"questions": ["<p>oslo is the capital of *norway*<\/p>"]
   */
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
    (template as any).questions = base.map(tp => this.generateBlank)
    return template;

  }
  generateBlank(tp: TranslationPair) {
    //find longest word start and wrap in **
    return su.wrap(su.wrapLongestWord(tp.translation));
  }
  /**
   * 
   * @param input string to be wrapped
   * @param tag .start prepended and .end appended 
   * @returns 
   */

  getSupportedLibrary(): string {
    return "H5P.Blanks"; //@todo 
  }
}

