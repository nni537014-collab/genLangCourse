import type {
  courseGenConfig,
  ContentGenerator,
  TranslationPair,
  Writer,
  GenSet,
} from "../types/types.ts";
import { loadStyle } from "../types/types.ts";
import { PairsWordExpander } from "./pairs/pairsWordExpander.ts";
//@todo move pairsfilereaderwriter
import { Pairs } from "./pairs/pairs.ts";
import { PairsFileReaderWriter } from "./pairs/pairsFileReaderWriter.ts";
import { generatorTemplateFinder } from "../utils/utils.ts";
import { AudioFileCreator } from "./writers/audio_file.ts";
export class CourseCreator {
  _config: courseGenConfig;
  _genSets: GenSet[];
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
      [],
    );
  }
  constructor(config: courseGenConfig, pairs: Pairs, genSets: GenSet[]) {
    this._config = config;
    this._pairs = pairs;
    this.chunkPairs();
    this._genSets = genSets;
    for (let i = 0; i < this._pairsChunks.length; i++) {
      const chunk = this._pairsChunks[i];
      if (chunk) {
        this.runGenerators(chunk);
      }
    }
    //iterate chunks
    //    call generators
  }
  runGenerators(chunk: TranslationPair[]) {
    this._genSets.forEach((genSet, index) => {
      const templates = generatorTemplateFinder(
        genSet.content.getSupportedLibrary(),
      );
      const content = genSet.content.generate(chunk, templates.content);
      const h5p = genSet.h5p.generate(templates.h5p, index);
      genSet.writer.write(content, h5p, index);
      //logging?
      //data structure for created h5p's for later report rendering
    });
  }
  getWriter(generator: ContentGenerator): Writer {
    throw new Error("Method not implemented.");
  }
  chunkPairs() {
    const data = this._pairs.getPairs();
    let i = 0;
    let chunkSize = this._config.chunkSize;
    this._pairsChunks = []; //reset
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      this._pairsChunks.push(chunk);
    }

    return;
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
  extendBaseData() {}
}
