import { readFileSync } from "fs";
import type { TranslationPair, LoadStyle } from "../../types/types.ts";
import { loadStyle } from "../../types/types.ts";
import { paths } from "../../utils/paths.ts";
import { PairsWordExpander } from "./pairsWordExpander.ts"
import path from "path";
import { fileURLToPath } from 'node:url';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import type { PairsFileReaderWriter } from "./pairsFileReaderWriter.ts";

// 1. Convert the current ES module URL to a standard file path
const __filename = fileURLToPath(import.meta.url);
// 2. Extract the directory name from the file path
const __dirname = path.dirname(__filename);


export class Pairs {
    _pairs: TranslationPair[];
    _expander: PairsWordExpander;
    _readerWriter: PairsFileReaderWriter;
    constructor(expander: PairsWordExpander, load: LoadStyle, readerWriter: PairsFileReaderWriter) {
        // loads pairs and writes to disk
        const writePairsToDisk = (pairs: TranslationPair[]) => {
            return readerWriter.writeJSON(pairs);
        }
        const loadCreatedPairs = (): TranslationPair[] | undefined => {
            const [success, pairs] = readerWriter.readJSON();
            if (success) {
                return pairs;
            } 
        }

        const loadRawPairs = () => {

            const [sucess, pairs] = readerWriter.readTxt();
            if (sucess) {
                this._expander.expand(pairs);
                return pairs;
            } 
        }

        const loadInitial = () => {
            const rawPairs = loadRawPairs();
            if (rawPairs) {
                writePairsToDisk(rawPairs);
                return rawPairs;
            }

        }
        this._expander = expander;
        this._readerWriter = readerWriter;
        let p: TranslationPair[] | undefined;
        switch (load) {
            case loadStyle.LOAD_INITIAL:
                console.log("loading initial");
                p = loadInitial();
                if (p) {
                    this._pairs = p;
                } else {
                    throw Error("load");
                }
                // this.writePairsToDisk();
                //@todo 
                //stringify
                // write to disk
                break;
            case loadStyle.LOAD_FROM_DISK:
                console.log("creating from json")
                p = loadCreatedPairs();
                if (p)
                    this._pairs = p;
                else {
                    console.log("load from disk failed, loading initial");
                    p = loadInitial()
                    if (p)
                        this._pairs = p;
                    else {
                        throw new Error("load from disk");
                    }
                }
            default:
                throw new Error("load not specificied correctly");
        }
    }



    getPairs() {
        return this._pairs;
    }
}
export { loadStyle };

