import type { TranslationPair } from "./../../types/types.ts";

import { paths, md5Filename, audioFileName } from "../../utils/paths.ts";
import fs from "fs";
import say from "say";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

export type FlatBase = Record<string, string>;
class AudioFileCreator {
  //    state: "ready" | "busy" = "ready";
  //    busyCount = 0;
  voice = "Microsoft Hazel Desktop";
  _base: TranslationPair[];
  _flatBase: FlatBase = {};
  constructor(base: TranslationPair[]) {
    this._base = base;
  }
  flatBase() {
    this._base.forEach((tp) => {
      this._flatBase[this.key("source", tp.source)] = tp.source;
      this._flatBase[this.key("translation", tp.translation)] = tp.translation;
    });
    return Object.entries(this._flatBase);
  }
  produceAllFiles(allSettled: (stored: string[]) => void) {
    //        this._base.forEach(this.produceFile)
    const created: Promise<Record<string, string>>[] = [];
    for (const [fileName, text] of this.flatBase()) {
      created.push(this.createAudioFile(text, fileName));
    }
    const set = Promise.allSettled(created);
    set.then(
      (stored) => {
        const values = stored
          .map((value) => {
            if (value.status === "fulfilled") {
              return value.value;
            } else {
              return undefined;
            }
          })
          .filter((value) => value);
        allSettled(values);
      },
      (reason) => {
        console.log(reason);
      },
    );
  }
  createAudioFile(text: string, filePath: string) {
    const wavFile = `${filePath}.wav`;
    return new Promise<Record<string, string>>((resolve, reject) => {
      say.export(text, this.voice, 1, wavFile, (err) => {
        if (err) reject(err);
        execSync(`ffmpeg -y -i ${wavFile} ${filePath}`);
        const res: Record<string, string> = {};
        res[filePath] = text;
        resolve(res);
      });
    });
  }
  protected key(type: "source" | "translation", input: string) {
    return `${audioFileName(input, type)}`;
  }
}
