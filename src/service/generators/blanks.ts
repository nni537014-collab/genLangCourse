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
    
    return this.wrapWithTags(this.wrapLongestWord(tp.translation));

  }
  wrapWithTags(input: string) {
    return `<p>${ input }</p>`
  }

  wrapLongestWord(input: string) {
    const parts = input.split(" ");
    let longest: { index: number, length: number } = {
      index: 0,
      length: 0
    }
    const partInfo = parts.map((part, i) => {
      const ret = {
        length: 0,
        endOffset: 0,
        startOffset: 0
      };
      //@todo improve regex
      const end = part.match(/[,.?!:;]+?$/);
      if (end) {
        ret.endOffset = end[0].length;
      }
      const start = part.match(/^[,.?!:;]+/);
      if (start) {
        ret.startOffset = start[0].length;
      }
      ret.length = part.length - ret.endOffset - ret.startOffset;
      if (longest.length < ret.length) {
        longest.length = ret.length;
        longest.index = i;
      }
      return ret;
    })

    const part = parts[longest.index];
    const info = partInfo[longest.index];
    if (!part || !info) throw new Error("should never throw");
    const start = part.slice(0, info.startOffset);
    const middle = part.slice(info.startOffset, info.length + info.startOffset);
    const end = part.slice(part.length - info.endOffset, part.length)
    const wrapped = `${start}*${middle}*${end}`;
    parts[longest.index] = wrapped;
    return parts.join(" ");
  }
  getSupportedLibrary(): string {
    return "H5P.Blanks"; //@todo 
  }
}

