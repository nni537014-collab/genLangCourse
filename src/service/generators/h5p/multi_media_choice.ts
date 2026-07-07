import type { H5PJSON } from "../../../types/H5P/h5p.ts";
import type { H5pGenerator, JsonValue, LibraryNames, TranslationPair } from "../../../types/types.ts";

export class MultiMediaChoiceH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): LibraryNames {
        return "H5P.MultiMediaChoice"//libraryNames[5];
    }
    // generate(template: JsonValue): JsonValue | JsonValue[] {
    //     return template;
    // }
    generate(index: number, template: H5PJSON): H5PJSON {
        return template;
    }
}
