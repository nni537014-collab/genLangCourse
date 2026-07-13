import type { CoursePresentationContent } from "../../types/H5P/content/course-presentation.ts";
import type { H5PJSON } from "../../types/H5P/h5p.ts";
import { writeError, type ArchivedPaths, type GeneratorAudioSet, type JsonValue, type LibraryNames, type WriteError, type Writer } from "../../types/types.ts"
import { h5pWrite } from "../../utils/writer.ts";

export class CoursePresentationWriter implements Writer {
  constructor(public writeDirName: string, public archivedPaths: ArchivedPaths) {

  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.CoursePresentation"; //@todo 
  }
  async write(generated: CoursePresentationContent, audio: GeneratorAudioSet, h5p: H5PJSON, index: number){
    // get h5p.json
    // another set of generators?
    // wrapper object from factory 
   return await h5pWrite(generated, audio, h5p, index, this.getSupportedLibrary(), this.archivedPaths);
  }
}