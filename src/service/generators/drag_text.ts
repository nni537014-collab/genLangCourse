import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import su from "../../utils/string.ts"

import { md5Filename } from "../../utils/utils.ts"

export class DragTextGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue[] {
    /**
    @todo add simlr funcionality to other generators
    base param filtered for length as it makes sense
    for this exercise
    */

    const longBase = base.filter(tp => (tp.translation.length < 4));
    const remainder = 3 - (longBase.length % 3)
    const numberOfLoops = Math.floor(longBase.length / 3);
    const ret: JsonValue[] = [];
    for (let i = 0; i < longBase.length; i += 3) {
      let lastRun = false;
      const templInst = structuredClone(template) as any;
      if (i + 2 >= longBase.length) {
        lastRun = true;
      } else {

        const part1 = longBase[i]
        const part2 = longBase[i + 1]
        const part3 = longBase[i + 2]
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

