import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,
  LibraryNames,

} from "../../../types/types.ts";
import su from "../../../utils/string.ts"
import type { BlanksContent } from "../../../types/H5P/content/blanks.ts";
export class BlanksGenerator implements ContentGenerator {
    /**
    params
"questions": ["<p>oslo is the capital of *norway*<\/p>"]
   */
  generate(base: TranslationPair[], template: BlanksContent): BlanksContent {
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

  getSupportedLibrary(): LibraryNames {
    return "H5P.Blanks"; //@todo 
  }
}

