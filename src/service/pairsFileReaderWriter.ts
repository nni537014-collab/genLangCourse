import path, { dirname } from "path";
import type { PairsFileWriterConfig, TranslationPair } from "../types/types.ts";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { paths } from "../utils/paths.ts";


export class PairsFileReaderWriter {
    _writePath: string;
    constructor(config: PairsFileWriterConfig = {}) {
        const {
            dir = "tmp",
            name = "pairs.json"
        } = config;
        if (config.dir && config.name)
            this._writePath = path.join(__dirname, "../../", config.dir, config.name);
        else
            throw new Error("bad config");
    }
    writeJSON(pairs: TranslationPair[]) {
        let success = true;
        try {
            const dir = dirname(this._writePath);

            // Recursively create directory (does nothing if it already exists)
            mkdirSync(dir, { recursive: true });

            writeFileSync(this._writePath, JSON.stringify(pairs), 'utf-8')
        } catch (error) {
            success = false;
            console.warn((error as Error).message);
        }

        console.log(this._writePath, success); process.exit();
        return success;
    }
    readJSON(): [boolean, TranslationPair[]] {
        let success = true;
        let pairs: TranslationPair[] = [];
        try {
            pairs = JSON.parse(readFileSync(this._writePath, 'utf8'));
        } catch (error) {
            //@todo error logging
            success = false;
            console.warn((error as Error).message);
        }
        return [success, pairs];
    }
    readTxt(): [boolean, TranslationPair[]] {
        let success = true;
        // read whole file as UTF‑8 text
        let pairs: TranslationPair[] = [];
        try {
            const raw = readFileSync(paths.getAssetPairs(), "utf8");

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
        } catch (error) {
            success = false;
            console.warn((error as Error).message);
        }
        return [success, pairs];

    }
}