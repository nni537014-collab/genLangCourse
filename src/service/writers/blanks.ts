import { writeError } from "../../types/types.ts";
import type {
  ArchivedPaths,
  JsonValue,
  LibraryNames,
  WriteError,
  Writer,
} from "../../types/types.ts";
import { h5pWrite } from "../../utils/utils.ts";
export class BlanksWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths,
  ) {}
  
    getSupportedLibrary(): LibraryNames {
      return "H5P.Blanks"; //@todo 
    }
  write(generated: JsonValue, h5p: JsonValue, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory

    return writeError.NO_ERROR;
  }
}
