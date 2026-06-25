import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename } from "../../utils/utils.ts"

export class MultiChoiceGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
     return template;
    
/*
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
*/
  }
  getSupportedLibrary(): string {
    return "H5P.MultiChoice"; //@todo 
  }
}

