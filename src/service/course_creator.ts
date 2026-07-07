import type {
  courseGenConfig,
  ContentGenerator,
  TranslationPair,
  Writer,
  GenSet,
  LibraryNames,
  Creator,
  ArchivedPaths,
  AllSegmentArchivedPaths,
  WrittenH5PArchive
} from "../types/types.ts";
import {
  loadStyle
} from "../types/types.ts";
import { PairsWordExpander } from "./pairs/pairsWordExpander.ts";
//@todo move pairsfilereaderwriter
import { Pairs } from "./pairs/pairs.ts";
import { PairsFileReaderWriter } from "./pairs/pairsFileReaderWriter.ts";
import { generatorTemplateFinder } from "../utils/utils.ts";
import { AudioFileCreator } from "./writers/audio_file.ts";
import { createGenSet, createWrittenH5PArchive } from "./gen_set_factory.ts";
export class CourseCreator implements Creator<TranslationPair[]> {
  static supportedLibraryNames: LibraryNames[] = ["H5P.CoursePresentation"];
  _config: courseGenConfig;
  _genSets: GenSet[];
  segmentedArchivedPaths: Record<
    string,
    {
      "H5P.Blanks": ArchivedPaths;
      "H5P.MultiMediaChoice": ArchivedPaths;
      "H5P.Dialogcards": ArchivedPaths;
      "H5P.SingleChoiceSet": ArchivedPaths;
      "H5P.MultiChoice": ArchivedPaths;
      "H5P.DragText": ArchivedPaths;
      "H5P.CoursePresentation": ArchivedPaths;
    }
  > = {};
  /**
   * this structure is data that will be passed to generators
   */
  _pairs: Awaited<ReturnType<typeof CourseCreator.prepareBaseDataFromAssets>>;
  _pairsChunks: TranslationPair[][] = [];
  /**
 * static factory
 * @param config 
 * @returns 
 */
  static async create(config: courseGenConfig) {
    return new CourseCreator(
      config,
      await CourseCreator.prepareBaseDataFromAssets(),
      CourseCreator.genSetFactory(),
    );
  }
  static genSetFactory() {
    return CourseCreator.supportedLibraryNames.map(createGenSet);
  }
  constructor(config: courseGenConfig, pairs: Pairs, genSets: GenSet[]) {
    this._config = config;
    this._pairs = pairs;

    this._genSets = genSets;
    const chunkPrefix = "segment#";
    let chunkPostFix = 0;
    for (let chunk of this.chunk()) {
      ++chunkPostFix;
      this.segmentedArchivedPaths[chunkPrefix + chunkPostFix] =
        this.runGenerators(chunk, createWrittenH5PArchive());
    }
    // for (let i = 0; i < this._pairsChunks.length; i++) {
    //   const chunk = this._pairsChunks[i];
    //   if (chunk) {
    //     this.runGenerators(chunk);
    //   }
    // }
    //iterate chunks
    //    call generators
  }
  map(allPaths: AllSegmentArchivedPaths): [Error | undefined] {
    return [undefined];
  }
  runGenerators(chunk: TranslationPair[], archive: WrittenH5PArchive) {
    //@todo remove this._archivedPaths
    // pass param with ref to corect obj
    // for (let ap of Object.values(this._archivedPaths)) {
    //   ap.clear();
    // }
    this._genSets.forEach((genSet, index) => {
      const templates = generatorTemplateFinder(
        genSet.content.getSupportedLibrary(),
      );
      const content = genSet.content.generate(chunk, templates.content);
      const h5p = genSet.h5p.generate(index, templates.h5p);
      genSet.writer.write(content, h5p, index);
      //logging?
      //data structure for created h5p's for later report rendering
    });
    let rec: Record<LibraryNames, ArchivedPaths>;
    this._genSets.forEach((genSet) => {
      const p = new Set(genSet.writer.archivedPaths) as ArchivedPaths;
      archive[genSet.writer.getSupportedLibrary()] = p;
      genSet.writer.archivedPaths.clear();
    });
    return archive;
  }
  //@todo create chunk interface that uses generics
  //chunk should return an array of T
  chunk() {
    const data = this._pairs.getPairs();
    let i = 0;
    let chunkSize = this._config.chunkSize;
    this._pairsChunks = []; //reset
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      this._pairsChunks.push(chunk);
    }

    return this._pairsChunks;
  }



  static async prepareBaseDataFromAssets() {
    const expander = await PairsWordExpander.create("es");
    const pairs = new Pairs(
      expander,
      loadStyle.LOAD_FROM_DISK,
      new PairsFileReaderWriter({
        dir: "tmp",
        name: "pairs.json",
      }),
    );
    //console.log(pairs.getPairs());
    console.log("pairs length:", pairs.getPairs().length);
    const audioFileCreator = new AudioFileCreator(pairs.getPairs());
    const audioRecords = await audioFileCreator.produceAllFiles((stored) => {});

    return pairs;

  }
  extendBaseData() {

  }

}
