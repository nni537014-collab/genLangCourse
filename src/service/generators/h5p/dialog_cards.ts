import type { H5pGenerator, JsonValue, LibraryNames, TranslationPair } from "../../../types/types.ts";
 import  { libraryNames } from "../../../types/types.ts";
import type { H5PJSON } from "../../../types/H5P/h5p.ts";
export class DialogCardsH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): LibraryNames {
        return libraryNames[2];
    }
    generate(index: number, template: H5PJSON): H5PJSON | H5PJSON[] {
        return template;
    }
}