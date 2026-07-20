import { describe, it, expect } from "vitest";
import { ContentGenerator, LibraryNames } from "../types/types.ts"

export function testGetSupportedLibrary(getGenerator: () => ContentGenerator, name: LibraryNames) {
    describe("getSupportedLibrary", () => {
        it("should return the correct library name", () => {
            expect(getGenerator().getSupportedLibrary()).toBe(name);
        });
    });
}
