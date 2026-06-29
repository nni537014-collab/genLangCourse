import { writeError, type ArchivedPaths, type JsonValue, type WriteError, type Writer } from "../../types/types.ts";
import { h5pWrite } from "../../utils/utils.ts";
export class BlanksWriter implements Writer {
  constructor(public writeDirName: string, public archivedPaths: ArchivedPaths){

  }
  write(generated: JsonValue, h5p: JsonValue, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 

      return writeError.NO_ERROR;
  }
}
