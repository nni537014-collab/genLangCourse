import { off } from "process";
import type { DragTextContent } from "../../../types/H5P/content/drag-text.ts";
import type {
  TranslationPair,
  ContentGenerator,
  LibraryNames,
  generatorWriteData,
} from "../../../types/types.ts";
import su from "../../../utils/string.ts";
import { genRandomNumbers } from "../../../utils/utils.ts";
// import { generatorTemplateFinder } from "../../../utils/utils.ts";


export class DragTextGenerator implements ContentGenerator {
  public getNumberIncluded(){
    return 3;
  }
  generate(
    base: TranslationPair[],
    template: DragTextContent,
  ): generatorWriteData<DragTextContent> {

    /**
      @todo add simlr funcionality to other generators
      base param filtered for length as it makes sense
      for this exercise
    */
    const longBase = base.filter((tp) => tp.translation.split(" ").length > 3);
    const remainder = longBase.length % this.getNumberIncluded();
    let lastAvailIndexes = this.getNumberIncluded() - remainder;
    const completeSets = Math.floor(longBase.length / this.getNumberIncluded());
    const ret: DragTextContent[] = [];
    if(completeSets < 1) return { content: ret };
    console.log("longbase", longBase.length, "completeSets", completeSets, "remainder", remainder, "lastAvailIndexes", lastAvailIndexes);
    for (let i = 0; i < completeSets; i++) {
      const offset = i * this.getNumberIncluded();

      const templInst = structuredClone(template);
      const parts: TranslationPair[] = []
      for (let j = 0; j < this.getNumberIncluded(); j++){
        const candidate = longBase[offset + j]
        if(!candidate) throw new Error("bad logic");
        parts.push(candidate);
      }
      templInst.textField = "";
      templInst.textField = parts
        .map((p) => su.wrapLongestWord(p.translation))
        .join("\n");
      ret.push(templInst);

    }
    if (remainder > 0) {
      const templInst = structuredClone(template);

      const offset = completeSets * this.getNumberIncluded();
      const parts: TranslationPair[] = [];
      let count = 0;
      const skip: number[] = [];
      while (lastAvailIndexes > 0) {
        lastAvailIndexes--;
        skip.push(offset + count);
        const tp = longBase[offset + count];
        if (!tp) throw new Error("bad data");
        parts.push(tp);
        count++;
      }
      //@todo mv the -1 to make logic more clear
      const upperLimit = offset -1;
      const randIndexes = genRandomNumbers(remainder, 0, upperLimit - 1, skip);
      for (const index of randIndexes) {
        const tp = longBase[index];
        if (!tp) throw new Error("bad data");
        parts.push(tp);
        count++;
      }
      templInst.textField = "";
      for (const part of parts) {
        templInst.textField += su.wrapLongestWord(part.translation);
        templInst.textField += "\n";
      }
      ret.push(templInst);
      //@todo non complete sets require filling with
      // repeated examples
    }
    return { content: ret };
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.DragText"; //@todo
  }
}

// const generator = new DragTextGenerator();
// const tp: TranslationPair[] = [
//   {
//     source: "this is a test",
//     translation: "esto es una, LA VERDAD ES QUE NO SE QUE PONER, PERO ESTO ES UNA PRUEBA",
//   },
//   {
//     source: "this is a test",
//     translation: "esto es una prueba",
//   },
//   {
//     source: "this is a test",
//     translation: "esto es una prueba",
//   }
// ]
// // const template: DragTextContent = dragTextContentSchema.parse(generatorTemplateFinder("H5P.DragText"))  ;
// // generator.generate([tp], template);
// const wtfTemp = getValidatedContentTemplate("H5P.DragText", generatorTemplateFinder("H5P.DragText"));
// console.log(wtfTemp);
// const ret = generator.generate(tp, wtfTemp).content;
// if(!Array.isArray(ret)) throw new Error("bad data");
// ret.forEach((c) => {
//   console.log(c.textField);
// })
