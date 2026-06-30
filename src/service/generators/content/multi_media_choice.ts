import { randomUUID } from "crypto";
import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,
  LibraryNames,

} from "../../../types/types.ts";
import { audioFileName } from "../../../utils/paths.ts"

export class MultiMediaChoiceGenerator implements ContentGenerator {
  _question = {
    prefix: "<h3>Select the matching audio<\/h3><p>",
    postfix: "<\/p>"
  };
    generate(base: TranslationPair[], template: JsonValue): JsonValue {
     
     base.map((tp, i) => {

       const templ = structuredClone(template) as any;
       templ.question = `${this._question.prefix}${tp.source}${this._question.postfix}`
       templ.media.type = this.generateMedia(tp, templ.media.type, "source");
       templ.options = this.generateOptions(tp, i, base, templ.options);
     });
     return template;
  }
  generateMedia(tp: TranslationPair, template: JsonValue, type: "source"|"translation"): JsonValue{
         
         (template as any).subContentId = randomUUID(); //@todo check function - utils?
         (template as any).params.files = [{
                          "path": this.generateFilePath(tp[type], type),
                          "mime": "audio\/mpeg",
                          "copyright": { "license": "U" }
                        }]
         return template;
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
  }
  generateOptions(tp: TranslationPair, index: number, base: TranslationPair[], templ: JsonValue){
    
    if(!Array.isArray(templ)) throw new Error("bad templ")
    const mediaTempl = templ.pop() as any;
    if(!mediaTempl || !mediaTempl.media) throw new Error("bad templ")
    const ret: { media: any, correct: boolean}[] = [];
    const optionBaseIndexes: number[] = [index];
    
    while(optionBaseIndexes.length <  3){
      const candidate = Math.random() * base.length;
      if(candidate !== index &&
         !optionBaseIndexes.includes(candidate))
          optionBaseIndexes.push(candidate);
    }

    for(let i = 0; i < optionBaseIndexes.length; i++){
      const current = base[i];
      if(!current) throw new Error("bad pairs")
      ret.push({
        media:this.generateMedia(
            current,
            structuredClone(mediaTempl.media),
            "translation"),
        correct: (i === 0)
      })
    }
    return ret;
  }
  generateFilePath(input: string, type: "source" | "translation"){
      return `audio/${audioFileName(input, type)}`;
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.MultiMediaChoice"; //@todo 
  }
}

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
