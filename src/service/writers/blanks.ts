import { writeError, type JsonValue, type WriteError, type Writer } from "../../types/types.ts"
writeError.ERROR;

export class BlanksWriter implements Writer {
  constructor(public writeDirName: string){

  }
  write(generated: JsonValue, index: number): WriteError {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 

      return writeError.NO_ERROR;
  }
}
