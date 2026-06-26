import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename, getAudioH5pRelativePath, genRandomNumbers, } from "../../utils/utils.ts"
import { error } from "console";

export class MultiChoiceGenerator implements ContentGenerator {
  numberOfWrongAnswers: number = 3;
  generate(base: TranslationPair[], template: JsonValue): JsonValue[] {
    //creating an array of structuredClone of template

    const ret: JsonValue[] = base.map(tp => {
      const templClone = structuredClone(template) as any;
      const file = templClone.media.type.params.files[0];
      if (typeof file !== "object") throw new Error("bad data");
      file.path = this.generateAudioPath(tp);

      templClone.question = this.generateQuestion(tp);
      templClone.answers = this.generateAnswers(tp, base, templClone.answers);
      return templClone;
    });
    //media {: type: { params : { files {path:string}[] - path
    //need path for one file - learning language phrase

    //question: string - just instruction to listen
    //wrap in <p>

    //answers {correct: boolean, text: string}[]
    // text in source lang  - one correct ans - wrap <div>
    // structuredClone required
    return [];//template;


    const j = {
      "media": {
        "disableImageZooming": false,
        "type": {
          "params": {
            "playerMode": "minimalistic",
            "fitToWrapper": false,
            "controls": true,
            "autoplay": false,
            "playAudio": "Play audio",
            "pauseAudio": "Pause audio",
            "contentName": "Audio",
            "audioNotSupported": "Your browser does not support this audio",
            "files": [
              {
                "path": "audios\/files-6a3a4467a3f91.mp3",
                "mime": "audio\/mpeg",
                "copyright": { "license": "U" }
              }
            ]
          },
          "library": "H5P.Audio 1.5",
          "metadata": {
            "contentType": "Audio",
            "license": "U",
            "title": "Untitled Audio"
          },
          "subContentId": "823aa57d-c970-4f38-a747-0ac17f4fb65f"
        }
      },
      "answers": [
        {
          "correct": true,
          "tipsAndFeedback": {
            "tip": "",
            "chosenFeedback": "",
            "notChosenFeedback": ""
          },
          "text": "<div>correct answer<\/div>"
        },
        {
          "correct": false,
          "tipsAndFeedback": {
            "tip": "",
            "chosenFeedback": "",
            "notChosenFeedback": ""
          },
          "text": "<div>wrong answer<\/div>"
        }
      ],
      "question": "<p>Listen and then select the correct answer<\/p>"
    }
  }
  generateAnswers(tp: TranslationPair, base: TranslationPair[], template: JsonValue) {
    const ret: JsonValue[] = [];
    if (!Array.isArray(template)) throw new Error("bad data");
    const ansTempl = template[0];
    if (!ansTempl) throw new Error("bad data");
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
    const correct = structuredClone(ansTempl) as { correct: boolean, text: string };
    correct.correct = true;
    correct.text = `<div>${tp.source}</div>`
    ret.push(correct)
    for (let index of wrongIndexes) {
      const tpWrong = base[index];
      if (!tpWrong) throw new Error("bad data");
      const wrong = structuredClone(ansTempl) as { correct: boolean, text: string };
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
  generateQuestion(tp: TranslationPair): any {
    return "<p>Listen and then select the correct answer<\/p>";
  }
  generateAudioPath(tp: TranslationPair): any {
    return getAudioH5pRelativePath(tp.translation);
  }
  getSupportedLibrary(): string {
    return "H5P.MultiChoice"; //@todo 
  }
}

