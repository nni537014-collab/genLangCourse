import type { TranslationPair } from "./../../types/types.ts"
import { paths } from "../../utils/utils.ts"
import fs from "fs"
import say from "say";
import { execSync } from "child_process";

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
        const translationAudioPath = paths.getAudio(tp.translation); 
        const sourceAudioPath = paths.getAudio(tp.source); 

        if (!fs.existsSync(translationAudioPath)) {
            //gen
        }
        if (!fs.existsSync(sourceAudioPath)) {
            //gen
        }
    }
    createAudioFile(text: string, filePath: string) {
        say.export("Hello world", "Microsoft Hazel Desktop", 1, filePath, (err) => {
  if (err) return console.error(err);

  //execSync(`ffmpeg -y -i ${wavFile} ${mp3File}`);
});
    }
}