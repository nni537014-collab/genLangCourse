import { rmSync } from "fs"
import path from "path"
import {
    outDirName,
    assetsDirName,
    pairsFileName,
    dictionaryPath
} from "../config.ts"

import { fileURLToPath } from "url";
import { createHash } from "crypto";
import type { JsonValue, contentGenerator } from "../types/types.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generatorTemplateFinder(): JsonValue{
   return "";
}
export function md5Filename(input: string): string {
  return createHash("md5").update(input).digest("hex");
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
