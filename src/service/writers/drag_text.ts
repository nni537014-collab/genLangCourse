import type { H5PJSON } from "../../types/H5P/h5p.ts";
import { writeError, type JsonValue, type WriteError, type Writer } from "../../types/types.ts"
import type {
    
    ArchivedPaths,
    LibraryNames,
} from "../../types/types.ts";

export default class DragTextWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths
  ){


  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.DragText"; //@todo 
  }

  write(generated: JsonValue, h5p: H5PJSON, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 

      return writeError.NO_ERROR;
  }
}
