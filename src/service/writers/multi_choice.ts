import type { MultiChoiceContent } from "../../types/H5P/content/multi-choice.ts";
import type { H5PJSON } from "../../types/H5P/h5p.ts";
import {
  writeError,
  type JsonValue,
  type WriteError,
  type Writer,
} from "../../types/types.ts";
import type {
  GeneratorAudioSet,
  ArchivedPaths,
  LibraryNames,
} from "../../types/types.ts";
import { h5pWrite } from "../../utils/writer.ts";

export class MultiChoiceWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths,
  ) { }
  getSupportedLibrary(): LibraryNames {
    return "H5P.MultiChoice"; //@todo
  }
  async write(
    generated: MultiChoiceContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
    index: number,
  ) {
    return await h5pWrite(generated, audio, h5p, index, this.getSupportedLibrary(), this.archivedPaths);
  }
}
