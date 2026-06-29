import type { H5pGenerator, JsonValue, LibraryNames, TranslationPair } from "../../../types/types.ts";
 import  { libraryNames } from "../../../types/types.ts";

export class MultiMediaChoiceH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): LibraryNames {
        return libraryNames[5];
    }
    generate(template: JsonValue): JsonValue | JsonValue[] {
        return template;
    }
}