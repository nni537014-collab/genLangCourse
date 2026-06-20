import { readFileSync } from "fs";
import type { TranslationPair } from "../types/types.ts";
import { getAssetPairsPath } from "./utils.ts";
import { PairsWordExpander } from "./pairsWordExpander.ts"
import path from "path";
import { fileURLToPath } from 'node:url';
import { writeFileSync } from "fs"

// 1. Convert the current ES module URL to a standard file path
const __filename = fileURLToPath(import.meta.url);
// 2. Extract the directory name from the file path
const __dirname = path.dirname(__filename);
export const loadStyle = {
    LOAD_INITIAL: "LOAD_INITIAL",
    LOAD_FROM_DISK: "LOAD_FROM_DISK"
} as const;
export type LoadStyle = typeof loadStyle[keyof typeof loadStyle]

export type PairsFileWriterConfig = {
    dir?: string;
    name?: string;
}
export class PairsFileReaderWriter {
    _writePath: string;
    constructor(config: PairsFileWriterConfig = {}) {
        const {
            dir = "tmp",
            name = "pairs.json"
        } = config;
        if (config.dir && config.name)
            this._writePath = path.join(__dirname, config.dir, config.name);
        else 
            throw new Error("bad config");
    }
    writeJSON(pairs: TranslationPair[]){
        let success = true;
        try {
           writeFileSync(this._writePath, JSON.stringify(pairs), 'utf-8')
        } catch (error) {
           success = false;
        }
        return success;
    }
    readJSON():[boolean, TranslationPair[]] {
        let success = true;
        let pairs: TranslationPair[] = [];
        try {
            pairs = JSON.parse(readFileSync(this._writePath, 'utf8'));
        } catch (error) {
            //@todo error logging
            success = false;
        }
        return [success, pairs];
    }
    readTxt(){
        let success = true;
        // read whole file as UTF‑8 text
        let pairs: TranslationPair[] = [];
        try{
            const raw = readFileSync(getAssetPairsPath(), "utf8");

        // split into lines (handles Windows + Linux newlines)
        const lines = raw.split(/\r?\n/);

        // skip first 2 lines
        const data = lines.slice(2)
            .filter(Boolean);

        pairs = data.map<TranslationPair>((line: string) => {
            const [source, translation] = line.split("\t");

            return {
                source: source?.trim() ?? "",
                translation: translation?.trim() ?? ""
            };
        })
            .filter(pair =>
                pair.source.length > 0 &&
                pair.translation.length > 0
            )
         } catch (error){
             success = false;
         }
         return [success, pairs];   
        
    }
}
export class Pairs {
    _pairs: TranslationPair[];
    _expander: PairsWordExpander;
    _readerWriter: PairsFileReaderWriter;
    constructor(expander: PairsWordExpander, load: LoadStyle, readerWriter: PairsFileReaderWriter) {
        // loads pairs and writes to disk
        const loadInitial = ()=> {
            const rawPairs = this.loadRawPairs();
            this.writePairsToDisk(rawPairs);
            return rawPairs;
        }
        this._expander = expander;
        this._readerWriter = readerWriter;
        switch (load) {
            case loadStyle.LOAD_INITIAL:
                
                this._pairs = loadInitial(); 
                // this.writePairsToDisk();
                //@todo 
                //stringify
                // write to disk
                break;
            case loadStyle.LOAD_FROM_DISK:
                const pairs = this.loadCreatedPairs(); 
                if(pairs)
                    this._pairs = pairs;
                else
                    this._pairs = loadInitial();
            default:
                this._pairs = loadInitial();
        }



    }
    writePairsToDisk(pairs: TranslationPair[]) {
        return this._readerWriter.writeJSON(pairs);
    }
    loadCreatedPairs(): TranslationPair[] | undefined {
        const [success, pairs] = this._readerWriter.readJSON();
        if(success){
            return pairs;
        }
        return;
    }

    loadRawPairs() {

        const pairs = this._readerWriter.readTxt();
        this._expander.expand(pairs);
        return pairs;
    }
    getPairs() {
        return this._pairs;
    }
}
