import type { DragTextContent } from "../../types/H5P/content/drag-text.ts";
import type { H5PJSON } from "../../types/H5P/h5p.ts";
import {
  // writeError,
  // type JsonValue,
  // type WriteError,
  type Writer,
  type GeneratorAudioSet,
} from "../../types/types.ts";
import type { ArchivedPaths, LibraryNames } from "../../types/types.ts";
import { h5pWrite } from "../../utils/writer.ts";

export default class DragTextWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths,
  ) { }
  getSupportedLibrary(): LibraryNames {
    return "H5P.DragText"; //@todo
  }

  async write(
    generated: DragTextContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
    index: number,
  ) {
    return await h5pWrite(generated, audio, h5p, index, this.getSupportedLibrary(), this.archivedPaths);
  }
}
