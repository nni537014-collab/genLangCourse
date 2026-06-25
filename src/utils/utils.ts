import { rmSync } from "fs"
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
    h5pAudioDirName
} from "../config.ts"
import { readFileSync } from "fs"
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import type { JsonValue, ContentGenerator } from "../types/types.ts";
import { hasUncaughtExceptionCaptureCallback } from "process";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const utilsToBase = "../../";
export function generatorTemplateFinder(supportedLibrary: string) {

    const templPath = path.join(
        __dirname,
        utilsToBase,
        assetsDirName,
        h5pAssetsDirName,
        supportedLibrary
    );
    const h5pJsonPath = path.join(
        templPath,
        h5pJsonFileName
    );
    const contentJsonPath = path.join(
        templPath,
        h5pContentDir,
        h5pContentFileName
    );
    const h5pJson = readFileSync(h5pJsonPath, "utf8");
    const h5pContent = readFileSync(contentJsonPath, "utf8");
    return {
        h5p: JSON.parse(h5pJson),
        content: JSON.parse(h5pContent)
    };
    // check required files can load
    // return tuple - [h5pJson, contentJson]

}
export function md5Filename(input: string): string {
    return createHash("md5").update(input).digest("hex");
}
export function audioFileName(input: string) {
    return `${md5Filename(input)}.mp3`
}
export function getAudioPath(input: string) {
    return path.join(
        audioDir(),
        audioFileName(input)
    )

}
export function getAudioH5pRelativePath(input: string) {
    return path.join(
        "audio",
        audioFileName(input)
    )
}
export function audioDir() {
    return path.join(
        __dirname,
        utilsToBase,
        assetsDirName,
        h5pAudioDirName
    )
}
export const clearPreviousGeneratedData = () => {
    return rmSync(getOutPath(), { recursive: true, force: true })
}

export const getAssetPairsPath = () => {
    return path.join(getAssetsPath(), pairsFileName);
}

const getOutPath = () => {
    return path.join(getBasePath(), outDirName)
}
const getAssetsPath = () => {
    return path.join(getBasePath(), assetsDirName)
}
export const getAssetDictionaryPath = () => {
    return path.join(getAssetsPath(), dictionaryPath);
}
const getBasePath = () => {
    return path.resolve(__dirname, "../../");
}
export const genRandomNumbers = (
    count: number,
    lowerLimit: number,
    upperLimit: number,
    skip: number[]) => {
    if(upperLimit - lowerLimit - skip.length < count) throw new Error("not possible to generate solutions");
    if(upperLimit < 0 || lowerLimit < 0) throw new Error("positive limits required");
    const generated: number[] = [];
    let repLimit = 10000; 
    let repCount = 0;
    while (generated.length < count) {
        const candidate = Math.random() * (upperLimit - lowerLimit) + lowerLimit;
        if (!skip.includes(candidate)
            && !generated.includes(candidate)
        ) {
           generated.push(candidate);
        }
        if( ++repCount > repLimit){
            throw new Error(`rep limit exceed, bad luck? 
                upperLimit: ${ upperLimit } lowerLimit: ${ lowerLimit }
                count: ${ count } skip length: ${skip.length}`)
        }

    }
    return generated;
}
