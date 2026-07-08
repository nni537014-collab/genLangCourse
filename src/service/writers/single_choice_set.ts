import type { H5PJSON } from "../../types/H5P/h5p.ts";
import type { SingleChoiceSetContent } from "../../types/H5P/single-choice-set.ts";
import { writeError, type WriteError, type Writer } from "../../types/types.ts"
import type {
    
    ArchivedPaths,
    LibraryNames,
} from "../../types/types.ts";

export class SingleChoiceSetWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths
  ){


  }
    getSupportedLibrary(): LibraryNames {
      return "H5P.SingleChoiceSet"; //@todo 
    }
  write(generated: SingleChoiceSetContent, h5p: H5PJSON, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 

      return writeError.NO_ERROR;
  }
}
