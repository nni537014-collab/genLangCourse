import type {
  TranslationPair,
  JsonValue,
  contentGenerator,
  subContentGenerator
} from "./../../types/types.ts";
import { md5Filename } from "./../utils.ts"

export class DialogGenerator implements subContentGenerator{
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
      const dialogs = this.createDialogs(base);
      return true;
  }
  createDialogs(base: TranslationPair[]) {
    return base.map( tp => {
      return    {
            "text": `<p style=\"text-align:center;\">${tp.source}<\/p>`,
            "answer": `<p style=\"text-align:center;\">${tp.translation }<\/p>`,
            "tips": {},
            "audio": [
                {
                    "path": `audios\/${md5Filename(tp.translation)}.mp3`,
                    "mime": "audio\/mpeg",
                    "copyright": {
                        "license": "U"
                    }
                }
            ]
        }
    })
    throw new Error("Method not implemented.");
  }
  getSupportedLibrary(): string {
      return "H5P.Dialog"; //@todo 
  }
}

