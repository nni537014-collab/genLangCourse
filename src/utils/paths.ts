//@todo move paths to separate file
import { ZipArchive } from "archiver"

import {
    
    createReadStream,
    mkdirSync,
    rmSync,
    readFileSync,
    writeFileSync,
    createWriteStream,
    copyFileSync,
    renameSync,
    type PathLike
} from "fs"
import path from "path"
import {
    outDirName,
    assetsDirName,
    pairsFileName,
    dictionaryPath,
    h5pAssetsDirName,
    h5pJsonFileName,
    h5pContentDir,
    h5pContentFileName,
    h5pAudioDirName,
    writeDirName
} from "../config.ts"

import { fileURLToPath } from "url";
import { createHash } from "crypto";
import type {
    JsonValue,
    ContentGenerator,
    LibraryNames,
    ArchivedPaths,
    WrittenH5PArchive,
    SourceOrTranslation
} from "../types/types.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const utilsToBase = "../../";

export function md5Filename(input: string): string {
    return createHash("md5").update(input).digest("hex");
}
export function audioFileName(input: string, type: "source" | "translation") {
    return `${md5Filename(input)}.mp3`
}
function getAudioPath(input: string, type: SourceOrTranslation) {
    return path.join(
        audioDir(),
        audioFileName(input, type)
    )

}
function getAudioH5pRelativePath(input: string, type: SourceOrTranslation) {
    return path.join(
        "audio",
        audioFileName(input, type)
    )
}
function audioDir() {
    return path.join(
        __dirname,
        utilsToBase,
        assetsDirName,
        h5pAudioDirName
    )
}

 const getAssetPairsPath = () => {
    return path.join(getAssetsPath(), pairsFileName);
}

const getOutPath = () => {
    return path.join(getBasePath(), outDirName)
}
 const getWritePath = () => {
    return path.join(getOutPath(), writeDirName);
}
const getAssetsPath = () => {
    return path.join(getBasePath(), assetsDirName)
}
const getAssetDictionaryPath = () => {
    return path.join(getAssetsPath(), dictionaryPath);
}
const getBasePath = () => {
    return path.resolve(__dirname, "../../");
}
export const paths = {
    getBase: getBasePath,
    getAssetDictionary: getAssetDictionaryPath,
    getWrite: getWritePath,
    getOut: getOutPath,
    getAssetPairs: getAssetPairsPath,
    audioDir: audioDir,
    getAudioH5pRelative: getAudioH5pRelativePath,
    getAudio: getAudioPath

}
