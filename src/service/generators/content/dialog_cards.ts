import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,
  LibraryNames,

} from "../../../types/types.ts";
import { paths  } from "../../../utils/paths.ts"

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
            "path": `${paths.getAudioH5pRelative(tp.translation)}`,
            "mime": "audio\/mpeg",
            "copyright": {
              "license": "U"
            }
          }
        ]
      }
    })
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.Dialogcards"; //@todo 
  }
}

