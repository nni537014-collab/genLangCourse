import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename } from "./../utils.ts"

export class BlanksGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
    (template as any).questions = base.map(tp => {

    })
    return template;
    /**
    params
"questions": ["<p>oslo is the capital of *norway*<\/p>"]
   */

  }
  generateBlank(tp: TranslationPair) {
    //find longest word start and wrap in **
    const parts = tp.translation.split(" ");
    let longest: { index: number, length: number } = {
      index: 0,
      length: 0
    }
    const partInfo = parts.map((part, i) => {
      const ret = {
        length: 0,
        endPunc: false,
        startPunc: false
      };
      ret.length = part.length
      //@todo improve regex
      if (part.match('/[,.?!:;]$/')) {
        ret.endPunc = true;
        ret.length -= 1;
      } if (part.match('/^[,.?!:;]/')) {
        ret.length -= 1;
        ret.startPunc = true;
      }
      if (longest.length < ret.length) {
        longest.length = ret.length;
        longest.index = i;
      }
      return ret;
    })
    const partWrapper = (toWrap: string )=>{

    }
    // wrap longest
    parts[longest.index] = 

  }
  getSupportedLibrary(): string {
    return "H5P.Blanks"; //@todo 
  }
}

