import { rmSync } from "fs"
import path from "path"
import {
    outDirName,
    assetsDirName,
    pairsFileName,
    dictionaryPath
} from "../config.ts"

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
