import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import su from "../../utils/string.ts"
import { genRandomNumbers } from "../../utils/utils.ts"
// import { md5Filename } from "../../utils/utils.ts"
// import { off } from "process";

export class DragTextGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue[] {
    /**
    @todo add simlr funcionality to other generators
    base param filtered for length as it makes sense
    for this exercise
    */

    const longBase = base.filter(tp => (tp.translation.length < 4));
    let remainder = 3 - (longBase.length % 3);
    let lastAvailIndexes = 3 - remainder;
    const numberOfLoops = Math.floor(longBase.length / 3);
    const ret: JsonValue[] = [];
    for (let i = 0; i < longBase.length; i++) {
      let offset = i * 3;
      let lastRun = false;
      const templInst = structuredClone(template) as any;
      if (i > numberOfLoops) {
        const parts: TranslationPair[] = [];
        while (lastAvailIndexes > 0) {
          lastAvailIndexes--;
          const part = longBase[offset];
          if (!part) throw new Error("bad data");
          parts.push(part);
          offset++;
        }
        genRandomNumbers(remainder, 0, offset, )
      } else {
        const part1 = longBase[offset]
        const part2 = longBase[offset + 1]
        const part3 = longBase[offset + 2]
        if (part1 && part2 && part3) {


          templInst.textField =
            `${su.wrapLongestWord(part1.translation)}
${su.wrapLongestWord(part2.translation)}
${su.wrapLongestWord(part3.translation)}`
          ret.push(templInst);
        }
      }

    }
    return ret;
    /*
    params
    "textField": "Example one - replace *this* with\nexample two - repplace *that* with"
    */

  }
  getSupportedLibrary(): string {
    return "H5P.DragText"; //@todo 
  }
}

