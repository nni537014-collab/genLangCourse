import { readFileSync } from "fs";
import { getAssetDictionaryPath } from "./utils.ts"
class Dictionary{
    constructor(){
        const raw = readFileSync(getAssetDictionaryPath(), "utf8"); //@todo
        this._data =   
    }
}