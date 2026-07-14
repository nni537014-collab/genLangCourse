import type { DragTextContent } from "../../../types/H5P/content/drag-text.ts";
import { dragTextContentSchema } from "../../../types/H5P/content/drag-text.ts";
import type {
  TranslationPair,
  ContentGenerator,
  LibraryNames,
  generatorWriteData,
} from "../../../types/types.ts";
import su from "../../../utils/string.ts";
import { genRandomNumbers } from "../../../utils/utils.ts";
import { generatorTemplateFinder } from "../../../utils/utils.ts";
// import { md5Filename } from "../../utils/utils.ts"
// import { off } from "process";

export class DragTextGenerator implements ContentGenerator {
  generate(
    base: TranslationPair[],
    template: DragTextContent,
  ): generatorWriteData<DragTextContent> {
    /*
      params
        "textField": "Example one - replace *this* with\nexample two - repplace *that* with"
    */
    /**
      @todo add simlr funcionality to other generators
      base param filtered for length as it makes sense
      for this exercise
    */
    const longBase = base.filter((tp) => tp.translation.length < 4);
    const remainder = longBase.length % 3;
    let lastAvailIndexes = 3 - remainder;
    const completeSets = Math.floor(longBase.length / 3);
    const ret: DragTextContent[] = [];
    for (let i = 0; i < completeSets; i++) {
      const offset = i * 3;

      const templInst = structuredClone(template) as any;
      if (i < completeSets) {
        const part1 = longBase[offset];
        const part2 = longBase[offset + 1];
        const part3 = longBase[offset + 2];
        if (part1 && part2 && part3) {
          templInst.textField = `${su.wrapLongestWord(part1.translation)}
${su.wrapLongestWord(part2.translation)}
${su.wrapLongestWord(part3.translation)}`;
          ret.push(templInst);
        }
        //@todo skip param
        // const additional = genRandomNumbers(remainder, 0, offset, skip)
      } else {
        const parts: TranslationPair[] = [];
        let count = 0;
        while (lastAvailIndexes > 0) {
          lastAvailIndexes--;
          const tp = longBase[offset + count];
          if (!tp) throw new Error("bad data");
          parts[offset + count] = tp;
          count++;
        }
        const randIndexes = genRandomNumbers(remainder, 0, offset, []);
        for (const index of randIndexes) {
          const tp = longBase[index];
          if (!tp) throw new Error("bad data");
          parts[offset + count] = tp;
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
    }
    return { content: ret };
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.DragText"; //@todo
  }
}

const generator = new DragTextGenerator();
const tp: TranslationPair = {
  source: "this is a test",
  translation: "esto es una prueba",
};
const template: DragTextContent = dragTextContentSchema.parse(generatorTemplateFinder("H5P.DragText"))  ;
generator.generate([tp], template);
const wtfTemp = generatorTemplateFinder("H5P.DragText").content;
generator.generate([tp], wtfTemp);
