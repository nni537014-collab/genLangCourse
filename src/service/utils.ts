import { rmSync } from "fs"
import path from "path"
import { outDirName, assetsDirName, pairsFileName } from "../config.ts"

export const clearPreviousGeneratedData  =() =>{
    return rmSync(getOutPath(), { recursive: true, force: true })
}
export const getAssetPairsPath = ()=> {
  return path.join(getAssetsPath(), "")
}

const getOutPath = () => {
    return path.join(getBasePath(), outDirName)
}
const getAssetsPath = () => {
    return path.join(getBasePath(), assetsDirName)
}
const getBasePath = ()=> {
    return path.resolve(__dirname, "../../");
}
