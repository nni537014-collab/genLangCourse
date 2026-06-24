import { randomUUID } from "crypto";
import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename } from "./../utils.ts"

export class MultiMediaChoiceGenerator implements ContentGenerator {
  _question = {
    prefix: "<h3>Select the matching audio<\/h3><p>",
    postfix: "<\/p>"
  };
    generate(base: TranslationPair[], template: JsonValue): JsonValue {
     
     base.map(tp => {

       const templ = structuredClone(template) as any;
       templ.question = `${this._question.prefix}${tp.source}${this._question.postfix}`
       templ.media = this.generateMedia(tp)
     });
     return template;
/*
"media": {
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
                          "path": "audios\/files-6a3a495940dd5.mp3",
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
                    "subContentId": "acfb0c69-b385-49b9-98e0-2cfb0c0ba790"
                  },
                 
  "question": "<h3>Select the matching audio<\/h3><p>this is a phrase<\/p>"
"options": [
                   {
                    "media": {
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
                            "path": "audios\/files-6a3a489d935e2.mp3",
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
                      "subContentId": "2a6f7667-a2d1-4253-bcbe-9058abba2d34"
                    },
                    "correct": true
                  },
                  {
                    "media": {
                     
*/    
  }
  generateMedia(tp: TranslationPair, template: JsonValue): JsonValue{
  
         /*
           {       "type": {
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
                          "path": "audios\/files-6a3a495940dd5.mp3",
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
                    "subContentId": "acfb0c69-b385-49b9-98e0-2cfb0c0ba790"
                  },
         */
         (template as any).subContentId = randomUUID(); //@todo check function - utils?
         (template as any).files = [{
                          "path": this.generateFilePath(tp.source),
                          "mime": "audio\/mpeg",
                          "copyright": { "license": "U" }
                        }]
         return template;
  }
  generateFilePath(str: string){
    throw Error("no implementation")
  }
  getSupportedLibrary(): string {
    return "H5P.MultiMediaChoice"; //@todo 
  }
}

