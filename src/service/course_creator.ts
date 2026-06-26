import type {
    courseGenConfig,
    ContentGenerator,
    TranslationPair,
    
} from "../types/types.ts";
import  {
    loadStyle
} from "../types/types.ts";
import { PairsWordExpander } from "./pairsWordExpander.ts";
//@todo move pairsfilereaderwriter
import { Pairs, PairsFileReaderWriter } from "./pairs.ts";
import { generatorTemplateFinder } from "../utils/utils.ts"
export class CourseCreator {
  _config: courseGenConfig;
  _contentGenerator: ContentGenerator[];
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
      [],
      await CourseCreator.prepareBaseDataFromAssets()
    );
  }
  constructor(config: courseGenConfig, contentGenerators: ContentGenerator[], pairs: Pairs) {
    this._config = config;
    this._pairs = pairs;
    this.chunkPairs();
    this._contentGenerator = contentGenerators;
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
    this._contentGenerator.forEach((generator) => {
        const writer = this.getWriter(generator); 
        const generated = generator.generate(
            chunk, 
            generatorTemplateFinder(generator.getSupportedLibrary()).content) 
            writer.write(generated);
        
        });

  }
    getWriter(generator: ContentGenerator) {
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
    const pairs = new Pairs(expander,
      loadStyle.LOAD_FROM_DISK,
      new PairsFileReaderWriter({
        dir: "tmp",
        name: "pairs.json"
      }));
    //console.log(pairs.getPairs());
    console.log("pairs length:", pairs.getPairs().length);
    return pairs;

  }
  extendBaseData() {

  }

}