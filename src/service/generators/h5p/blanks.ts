import type { H5pGenerator, JsonValue, LibraryNames, TranslationPair } from "../../../types/types.ts";

export class BlankH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): LibraryNames {
        return "H5P.Blanks";
    }
    generate(template: JsonValue): JsonValue | JsonValue[] {
        return template;
    }
}