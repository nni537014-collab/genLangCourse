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
    write(pairs: TranslationPair[]){
        let success = true;
        try {
           writeFileSync(this._writePath, JSON.stringify(pairs), 'utf-8')
        } catch (error) {
           success = false;
        }
        return success;
    }
    read():[boolean, TranslationPair[]] {
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
}
export class Pairs {
    _pairs: TranslationPair[];
    _expander: PairsWordExpander;
    constructor(expander: PairsWordExpander, load: LoadStyle) {
        this._expander = expander;

        switch (load) {
            case loadStyle.LOAD_INITIAL:
                this._pairs = this.loadRawPairs();
                this.writePairsToDisk()
                //@todo 
                //stringify
                // write to disk
                break;
            case loadStyle.LOAD_FROM_DISK:
                this._pairs = this.loadCreatedPairs()
            default:
                this._pairs = this.loadRawPairs();
        }



    }
    writePairsToDisk() {
        try {
            JSON.stringify(this._pairs);
        } catch (error) {

        }
        throw new Error("Method not implemented.");
    }
    loadCreatedPairs(): TranslationPair[] {
        throw new Error("Method not implemented.");
    }

    loadRawPairs() {
        // read whole file as UTF‑8 text
        const raw = readFileSync(getAssetPairsPath(), "utf8");

        // split into lines (handles Windows + Linux newlines)
        const lines = raw.split(/\r?\n/);

        // skip first 2 lines
        const data = lines.slice(2)
            .filter(Boolean);

        const ret = data.map<TranslationPair>((line: string) => {
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
        this._expander.expand(ret);
        return ret;
    }
    getPairs() {
        return this._pairs;
    }
}