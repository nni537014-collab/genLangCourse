import type { GenSet } from "../types/types.ts";
import { BlanksGenerator } from "./generators/blanks.ts";
import { BlankH5pGenerator } from "./h5p/blanks.ts";
import { BlanksWriter } from "./writers/blanks.ts";
import { getWritePath} from "../utils/utils.ts"
export function createGenSet(libraryName: string ){
    let genSet: GenSet;

    switch(libraryName){
        case "H5p.Blanks":
            genSet = {
                content: new BlanksGenerator(), 
                h5p: new BlankH5pGenerator(),
                writer: new BlanksWriter(),
            }
    }
}