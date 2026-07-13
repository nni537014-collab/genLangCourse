import type { DialogcardsContent } from "../../types/H5P/content/dialog-cards.ts";
import type { H5PJSON } from "../../types/H5P/h5p.ts";
import {
  writeError,
  type WriteError,
  type Writer,
  type GeneratorAudioSet,
} from "../../types/types.ts";
import type { ArchivedPaths, LibraryNames } from "../../types/types.ts";

export class DialogCardsWriter implements Writer<DialogcardsContent> {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths,
  ) {}
  getSupportedLibrary(): LibraryNames {
    return "H5P.Dialogcards"; //@todo
  }
  write(
    generated: DialogcardsContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
    index: number,
  ): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory

    return writeError.NO_ERROR;
  }
}
