import type {
  TranslationPair,
  ContentGenerator,
  LibraryNames,
  SourceOrTranslation,
  GeneratorAudio,
  generatorWriteData,
} from "../../../types/types.ts";
import { genRandomNumbers } from "../../../utils/utils.ts";
import type {
  Answer,
  MultiChoiceContent,
} from "../../../types/H5P/content/multi-choice.ts";
import { getAudioH5pRelativePath } from "../../../utils/paths/audio.ts";

export class MultiChoiceGenerator implements ContentGenerator {
  numberOfWrongAnswers: number = 3;
  protected audioUsed: Set<GeneratorAudio> = new Set<GeneratorAudio>();
  generate(
    base: TranslationPair[],
    template: MultiChoiceContent,
  ): generatorWriteData<MultiChoiceContent> {
    //creating an array of structuredClone of template

    return {
      content: base.map((tp) => {
        const templClone = structuredClone(template);

        const file = templClone.media.type.params.files[0];
        if (typeof file !== "object") throw new Error("bad data");
        file.path = this.generateAudioPath(tp, "translation");

        templClone.question = this.generateQuestion();
        templClone.answers = this.generateAnswers(tp, base, templClone.answers);
        return templClone;
      }),
      audio: this.audioUsed,
    };
    // return ret;
  }
  generateAnswers(
    tp: TranslationPair,
    base: TranslationPair[],
    answersTemplate: Answer[],
  ) {
    const generatedAnswers: Answer[] = [];
    // if (!Array.isArray(answersTemplate)) throw new Error("bad data");
    const ansTempl = answersTemplate[0];
    const skipIndex = base.findIndex((tpUnderTest) => {
      return (
        tp.source === tpUnderTest.source &&
        tp.translation === tpUnderTest.translation
      );
    });
    if (skipIndex < 0) throw new Error("bad data");
    const wrongIndexes = genRandomNumbers(
      this.numberOfWrongAnswers,
      0,
      base.length,
      [skipIndex],
    );
    const correct = structuredClone(ansTempl);
    if (!correct) throw new Error("bad data");
    correct.correct = true;
    correct.text = `<div>${tp.source}</div>`;
    generatedAnswers.push(correct);
    for (const index of wrongIndexes) {
      const tpWrong = base[index];
      if (!tpWrong) throw new Error("bad data");
      const wrong = structuredClone(ansTempl);
      if (!wrong) throw new Error("bad data");

      wrong.correct = false;
      wrong.text = `<div>${tpWrong.translation}</div>`;
      generatedAnswers.push(wrong);
    }
    return generatedAnswers;
  }
  generateQuestion() {
    return "<p>Listen and then select the correct answer</p>";
  }
  generateAudioPath(tp: TranslationPair, type: SourceOrTranslation) {
    this.audioUsed.add({
      tp: tp,
      sourceOrTranslation: type,
    });
    return getAudioH5pRelativePath(tp.translation, type);
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.MultiChoice"; //@todo
  }
}
