import type { H5PJSON } from "../../types/H5P/h5p.ts";
import type { SingleChoiceSetContent } from "../../types/H5P/content/single-choice-set.ts";
import { writeError, type WriteError, type Writer } from "../../types/types.ts"
import type {

  ArchivedPaths,
  GeneratorAudioSet,
  LibraryNames,
} from "../../types/types.ts";
import { h5pWrite } from "../../utils/writer.ts";

export class SingleChoiceSetWriter implements Writer {
  constructor(
    public writeDirName: string,
    public archivedPaths: ArchivedPaths
  ) {


  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.SingleChoiceSet"; //@todo 
  }
  async write(
    generated: SingleChoiceSetContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
    index: number
  ) {
    return await  h5pWrite(generated, audio, h5p, index, this.getSupportedLibrary(), this.archivedPaths);
  }
}
