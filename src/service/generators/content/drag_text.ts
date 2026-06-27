import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "../../../types/types.ts";
import su from "../../../utils/string.ts"
import { genRandomNumbers } from "../../../utils/utils.ts"
// import { md5Filename } from "../../utils/utils.ts"
// import { off } from "process";

export class DragTextGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue[] {
    /*
      params
        "textField": "Example one - replace *this* with\nexample two - repplace *that* with"
    */
    /**
      @todo add simlr funcionality to other generators
      base param filtered for length as it makes sense
      for this exercise
    */
    const longBase = base.filter(tp => (tp.translation.length < 4));
    let remainder = longBase.length % 3;
    let lastAvailIndexes = 3 - remainder;
    const completeSets = Math.floor(longBase.length / 3);
    const ret: JsonValue[] = [];
    for (let i = 0; i < completeSets; i++) {
      let offset = i * 3;

      const templInst = structuredClone(template) as any;
      if (i < completeSets) {
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
        //@todo skip param
        // const additional = genRandomNumbers(remainder, 0, offset, skip)
      } else {
        const parts: TranslationPair[] = [];
        let count = 0;
        while(lastAvailIndexes > 0){
          lastAvailIndexes--;
          const tp = longBase[offset + count];
          if(!tp) throw new Error("bad data");
          parts[offset + count] =  tp;
          count++ 
        }
        const randIndexes = genRandomNumbers(remainder, 0, offset, []);
        for(let index of randIndexes){
          const tp = longBase[index];
          if(!tp) throw new Error("bad data");
          parts[offset + count] = tp; 
          count++;
        }
        templInst.textField = "";
        for(let part of parts){
           templInst.textField += su.wrapLongestWord(part.translation);
           templInst.textField += "\n";
        }
        ret.push(templInst);
        //@todo non complete sets require filling with
        // repeated examples  
      }
    }
    return ret;
  }
  getSupportedLibrary(): string {
    return "H5P.DragText"; //@todo 
  }
}

