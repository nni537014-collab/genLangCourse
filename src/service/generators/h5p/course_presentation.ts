import type { H5pGenerator, JsonValue, TranslationPair, LibraryNames } from "../../../types/types.ts";
 import  { libraryNames } from "../../../types/types.ts";

export class CoursePresentationH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): LibraryNames{
        return libraryNames[7];
    }
    generate(template: JsonValue): JsonValue | JsonValue[] {
        return template;
    }
}