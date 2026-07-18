import type { BlanksContent } from "../../types/H5P/content/blanks.ts";
import type { H5PJSON } from "../../types/H5P/h5p.ts";
// import { writeError } from "../../types/types.ts";
import type {
  ArchivedPaths,
  LibraryNames,
  // WriteError,
  Writer,
  GeneratorAudioSet,
} from "../../types/types.ts";
import { h5pWrite } from "../../utils/writer.ts";
// import { h5pWrite } from "../../utils/utils.ts";
export class BlanksWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths,
  ) {}

  getSupportedLibrary(): LibraryNames {
    return "H5P.Blanks"; //@todo
  }
  async write(
    generated: BlanksContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
    index: number,
  ): Promise<ArchivedPaths> {
    // get h5p.json
    // another set of generators?
    // wrapper object from factory
    return await h5pWrite(generated, audio, h5p, index, this.getSupportedLibrary(), this.archivedPaths);
    
  }
}
