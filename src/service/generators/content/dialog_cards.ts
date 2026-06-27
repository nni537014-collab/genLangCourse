import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "../../../types/types.ts";
import { getAudioH5pRelativePath  } from "../../../utils/utils.ts"

export class DialogCardsGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue {
      if(template === null) throw new Error();
      (template as any).dialogs = this.createDialogs(base);
      return template;
    
    
  }
  createDialogs(base: TranslationPair[]) {
    return base.map(tp => {
      return {
        "text": `<p style=\"text-align:center;\">${tp.source}<\/p>`,
        "answer": `<p style=\"text-align:center;\">${tp.translation}<\/p>`,
        "tips": {},
        "audio": [
          {
            "path": `${getAudioH5pRelativePath(tp.translation)}`,
            "mime": "audio\/mpeg",
            "copyright": {
              "license": "U"
            }
          }
        ]
      }
    })
  }
  getSupportedLibrary(): string {
    return "H5P.Dialogcards"; //@todo 
  }
}

