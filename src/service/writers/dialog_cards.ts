import type { DialogcardsContent } from "../../types/H5P/content/dialog-cards.ts";
import type { H5PJSON } from "../../types/H5P/h5p.ts";
import {
  // writeError,
  // type WriteError,
  type Writer,
  type GeneratorAudioSet,
} from "../../types/types.ts";
import type { ArchivedPaths, LibraryNames } from "../../types/types.ts";
import { h5pWrite } from "../../utils/writer.ts";

export class DialogCardsWriter implements Writer<DialogcardsContent> {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths,
  ) { }
  getSupportedLibrary(): LibraryNames {
    return "H5P.Dialogcards"; //@todo
  }
  async write(
    generated: DialogcardsContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
    index: number,
  ) {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory
    return await h5pWrite(generated, audio, h5p, index, this.getSupportedLibrary(), this.archivedPaths);
  }
}
