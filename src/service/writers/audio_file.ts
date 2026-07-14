import type { TranslationPair, AudioFileName } from "./../../types/types.ts";
import say from "say";
import { execSync } from "child_process";
import { getAudioAbsPath } from "../../utils/paths/audio.ts";
import { existsSync } from "fs";

export type FlatBase = Record<AudioFileName, string>;
export class AudioFileCreator {
  protected voice = "Microsoft Hazel Desktop";
  protected _base: TranslationPair[];
  protected _flatBase: FlatBase = {};
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
  async produceAllFiles(allSettled: (stored: string[]) => void) {
    const created: Promise<Record<AudioFileName, string>>[] = [];
    for (const filename of Object.keys(this._flatBase) as AudioFileName[]) {
      const text = this._flatBase[filename];
      if (!text) throw new Error("bad data");
      created.push(this.createAudioFile(text, filename));
    }
    const set = await Promise.allSettled(created);
    const ret = set
      .map((value) => {
        if (value.status === "fulfilled") {
          return value.value;
        } else {
          return undefined;
        }
      })
      .filter((value) => value) as unknown as FlatBase;
    return ret;
  }

  createAudioFile(text: string, filePath: AudioFileName) {
    const wavFile = `${filePath}.wav`;
    return new Promise<FlatBase>((resolve, reject) => {
      // skip if exists already
      if (existsSync(filePath)) {
        return resolve({ [filePath]: text });
      }
      say.export(text, this.voice, 1, wavFile, (err) => {
        if (err) reject(err);
        //@todo check if ffmpeg is installed and in path
        execSync(`ffmpeg -y -i ${wavFile} ${filePath}`);
        resolve({
          [filePath]: text
        });
      });
    });
  }
  protected key(type: "source" | "translation", input: string) {
    return getAudioAbsPath(input, type);
  }
}


export function audioFileCreatorFactory(base: TranslationPair[]) {
  return new AudioFileCreator(base);
}
