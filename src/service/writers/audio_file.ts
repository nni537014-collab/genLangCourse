import type { TranslationPair } from "./../../types/types.ts"
import { audioDir, md5Filename } from "./../utils.ts"
import { } from "./../../config.ts"
import path from "path";
import fs from "fs"
class AudioFileCreator {
    completed: TranslationPair[] = [];
    _base: TranslationPair[];
    constructor(base: TranslationPair[]) {
        this._base = base;
    }
    produceAllFiles() {
        this._base.forEach(this.produceFile)
    }
    produceFile(tp: TranslationPair) {
        const translationFileName = md5Filename(tp.translation);
        const sourceFileName = md5Filename(tp.source);
        const translationAudioPath = path.join(
            audioDir(),
            translationFileName
        );
        const sourceAudioPath = path.join(
            audioDir(),
            sourceFileName
        );
        if (!fs.existsSync(translationAudioPath)) {
            //gen
        }
        if (!fs.existsSync(sourceAudioPath)) {
            //gen
        }
    }
}