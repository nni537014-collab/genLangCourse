import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,
  LibraryNames,
  SourceOrTranslation,

} from "../../../types/types.ts";
import {  genRandomNumbers,  } from "../../../utils/utils.ts"
import {  paths, } from "../../../utils/paths.ts"
import type { Answer, MultiChoiceContent } from "../../../types/H5P/content/multi-choice.ts";


export class MultiChoiceGenerator implements ContentGenerator {
  numberOfWrongAnswers: number = 3;
  generate(base: TranslationPair[], template: MultiChoiceContent): MultiChoiceContent[] {
    //creating an array of structuredClone of template

    const ret: MultiChoiceContent[] = base.map(tp => {
      const templClone = structuredClone(template);
      
      const file = templClone.media.type.params.files[0];
      if (typeof file !== "object") throw new Error("bad data");
      file.path = this.generateAudioPath(tp, "translation");

      templClone.question = this.generateQuestion();
      templClone.answers = this.generateAnswers(tp, base, templClone.answers);
      return templClone;
    });
    return ret;

  }
  generateAnswers(tp: TranslationPair, base: TranslationPair[], template: Answer[]) {
    const ret: Answer[] = [];
    if (!Array.isArray(template)) throw new Error("bad data");
    const ansTempl = template[0];
    const skipIndex = base.findIndex(tpUnderTest => {
      return (tp.source === tpUnderTest.source &&
        tp.translation === tpUnderTest.translation
      )
    })
    if (skipIndex < 0) throw new Error("bad data");
    const wrongIndexes = genRandomNumbers(
      this.numberOfWrongAnswers,
      0,
      base.length,
      [skipIndex]);
    const correct = structuredClone(ansTempl);
    correct.correct = true;
    correct.text = `<div>${tp.source}</div>`
    ret.push(correct)
    for (const index of wrongIndexes) {
      const tpWrong = base[index];
      if (!tpWrong) throw new Error("bad data");
      const wrong = structuredClone(ansTempl);
      wrong.correct = false;
      wrong.text = `<div>${tpWrong.translation}</div>`;
      ret.push(wrong);
    }
    return ret;
    /*   {
   "correct": false,
   "tipsAndFeedback": {
     "tip": "",
     "chosenFeedback": "",
     "notChosenFeedback": ""
   },
   "text": "<div>wrong answer<\/div>"
 }*/

  }
  generateQuestion() {
    return "<p>Listen and then select the correct answer</p>";
  }
  generateAudioPath(tp: TranslationPair, type: SourceOrTranslation) {
    return paths.getAudioH5pRelative(tp.translation, type);
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.MultiChoice"; //@todo 
  }
}

