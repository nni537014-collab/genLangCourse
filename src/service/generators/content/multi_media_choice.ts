import { randomUUID } from "crypto";
import type {
  TranslationPair,
  ContentGenerator,
  LibraryNames,
  generatorWriteData,
  GeneratorAudioSet,
  GeneratorAudio,
} from "../../../types/types.ts";
import { paths } from "../../../utils/paths.ts";
import type {
  MultimediaChoiceContent,
  Option,
  OptionMedia,
} from "../../../types/H5P/content/multimedia-choice.ts";

export class MultiMediaChoiceGenerator implements ContentGenerator {
  _question = {
    prefix: "<h3>Select the matching audio</h3><p>",
    postfix: "</p>",
  };
  audioSet: GeneratorAudioSet = new Set<GeneratorAudio>();
  //@todo types
  generate(
    base: TranslationPair[],
    template: MultimediaChoiceContent,
  ): generatorWriteData<MultimediaChoiceContent> {
    base.map((tp, i) => {
      const newTemplate = structuredClone(template);
      newTemplate.question = `${this._question.prefix}${tp.source}${this._question.postfix}`;

      //  newTemplate.media.type = this.generateMedia(tp, newTemplate.media.type, "source");
      newTemplate.options = this.generateOptions(
        tp,
        i,
        base,
        newTemplate.options,
      );
    });
    return { content: [template], audio: this.audioSet };
  }
  generateMedia(
    tp: TranslationPair,
    template: OptionMedia,
    type: "source" | "translation",
  ): OptionMedia {
    template.subContentId = randomUUID(); //@todo check function - utils?
    template.params.files = [
      {
        path: this.generateFilePath(tp[type], type),
        mime: "audio/mpeg",
        copyright: { license: "U" },
      },
    ];
    return template;
  }
  generateOptions(
    tp: TranslationPair,
    index: number,
    base: TranslationPair[],
    templ: Option[],
  ) {
    if (!Array.isArray(templ)) throw new Error("bad templ");
    const optionTempl = templ.pop();
    if (!optionTempl) throw new Error("bad templ");
    const ret: Option[] = [];
    const optionBaseIndexes: number[] = [index];

    while (optionBaseIndexes.length < 3) {
      const candidate = Math.random() * base.length;
      if (candidate !== index && !optionBaseIndexes.includes(candidate))
        optionBaseIndexes.push(candidate);
    }

    for (let i = 0; i < optionBaseIndexes.length; i++) {
      const current = base[i];
      if (!current) throw new Error("bad pairs");
      const option = structuredClone(optionTempl);
      option.media = this.generateMedia(current, option.media, "translation");
      option.correct = i === 0;
      //@todo option.poster? writer must write aditional files?

      ret.push(option);
    }
    return ret;
  }
  generateFilePath(input: string, type: "source" | "translation") {
    //@todo 
    this.audioSet.add({ tp: { source: input, translation: input }, sourceOrTranslation: type });  
    return paths.getAudioH5pRelative(input, type);
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.MultiMediaChoice"; //@todo
  }
}
