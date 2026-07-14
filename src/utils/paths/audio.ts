import { createHash } from "crypto";
import type { AudioFileName, GeneratorAudio, SourceOrTranslation } from "../../types/types.ts";
import { getBasePath } from "../paths.ts";
import path from "path";
import { assetsDirName, h5pAudioDirName } from "../../config.ts";

export function md5Filename(input: string): string {
  return createHash("md5").update(input).digest("hex");
}
export function audioFileName(
  input: string,
  type: "source" | "translation",
): AudioFileName {
  return `${md5Filename(type + input)}.mp3`;
}
export function getAudioAbsPath(input: string, type: SourceOrTranslation) {
  return path.join(audioDir(), audioFileName(input, type)) as AudioFileName;
}
export function getAudioH5pRelativePath(input: string, type: SourceOrTranslation) {
  return path.join("audio", audioFileName(input, type)) as AudioFileName;
}
export function generatorAudioToPath(ga: GeneratorAudio, pathType: "h5p" | "absolute") {
  const subject = ga.sourceOrTranslation === "source" ? ga.tp.source : ga.tp.translation;
  if (pathType === "h5p") {
    return getAudioH5pRelativePath(subject, ga.sourceOrTranslation);
  } else {
    return getAudioAbsPath(subject, ga.sourceOrTranslation);
  }
}
export function audioDir() {
  return path.join(getBasePath(), assetsDirName, h5pAudioDirName);
}