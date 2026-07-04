import { writeError, type ArchivedPaths, type JsonValue, type LibraryNames, type WriteError, type Writer } from "../../types/types.ts"

export class MultiMediaChoiceWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths
  ){

  }
    getSupportedLibrary(): LibraryNames {
      return "H5P.MultiMediaChoice"; //@todo 
    }
  write(generated: JsonValue, h5p: JsonValue, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 

      return writeError.NO_ERROR;
  }
}
