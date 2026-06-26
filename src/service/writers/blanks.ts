import { writeError, type JsonValue, type WriteError, type Writer } from "../../types/types.ts"
writeError.ERROR;

export class BlanksWriter implements Writer {
  write(generated: JsonValue, index: number): WriteError {
      return writeError.NO_ERROR;
  }
}
