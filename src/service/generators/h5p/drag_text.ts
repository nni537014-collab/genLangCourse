import type { H5pGenerator, JsonValue, TranslationPair } from "../../../types/types.ts";

export class DragTextH5pGenerator implements H5pGenerator{
    getSupportedLibrary(): string {
        return "H5p.Blanks";
    }
    generate(template: JsonValue): JsonValue | JsonValue[] {
        return template;
    }
}