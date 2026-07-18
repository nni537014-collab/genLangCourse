import type {
  TranslationPair,
  // JsonValue,
  ContentGenerator,
  LibraryNames,
  generatorWriteData,
} from "../../../types/types.ts";
import type { DialogcardsContent } from "../../../types/H5P/content/dialog-cards.ts";
import { getAudioH5pRelativePath } from "../../../utils/paths/audio.ts";
export class DialogCardsGenerator implements ContentGenerator<DialogcardsContent> {
  generate(
    base: TranslationPair[],
    template: DialogcardsContent,
  ): generatorWriteData<DialogcardsContent> {
    if (template === null) throw new Error();
    template.dialogs = this.createDialogs(base);
    return { content: template };
  }
  createDialogs(base: TranslationPair[]) {
    return base.map((tp) => {
      return {
        text: `<p style="text-align:center;">${tp.source}</p>`,
        answer: `<p style="text-align:center;">${tp.translation}</p>`,
        tips: {},
        audio: [
          {
            path: `${getAudioH5pRelativePath(tp.translation, "translation")}`,
            mime: "audio/mpeg",
            copyright: {
              license: "U",
            },
          },
        ],
      };
    });
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.Dialogcards"; //@todo
  }
}
