import { readFileSync } from "fs";
import type { TranslationPair } from "../types/types.ts";
import { getAssetPairsPath } from "./utils.ts";
import { PairsWordExpander } from "./pairsWordExpander.ts"
export class Pairs {
    _pairs: TranslationPair[];
    _expander: PairsWordExpander;
    constructor(expander: PairsWordExpander) {
        this._expander = expander;
        this._pairs = this.loadPairs();
    }
    loadPairs() {
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
    getPairs(){
        return this._pairs;
    }
}