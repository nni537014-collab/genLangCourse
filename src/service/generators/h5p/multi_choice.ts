import type { H5PJSON } from "../../../types/H5P/h5p.ts";
import type { H5pGenerator, JsonValue, LibraryNames, TranslationPair } from "../../../types/types.ts";
 import  { libraryNames } from "../../../types/types.ts";

export class MultiChoiceH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): LibraryNames {
        return libraryNames[4];
    }
    generate(index: number, template: H5PJSON): H5PJSON {
        return template;
    }
}