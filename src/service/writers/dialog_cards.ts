import { writeError, type JsonValue, type WriteError, type Writer } from "../../types/types.ts"
import type {

  ArchivedPaths,
  LibraryNames,
} from "../../types/types.ts";

export class DialogCardsWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths
  ) {
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.Dialogcards"; //@todo 
  }
  write(generated: JsonValue, h5p: JsonValue, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 

    return writeError.NO_ERROR;
  }
}
