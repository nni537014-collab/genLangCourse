import type { H5pGenerator, JsonValue, TranslationPair } from "../../types/types.ts";

export class BlankH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): string {
        return "";
    }
    generate(base: TranslationPair[], template: JsonValue): JsonValue | JsonValue[] {
        return false;
    }
}