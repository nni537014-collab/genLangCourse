import { beforeEach, describe, expect, it, vi } from "vitest";
import { DragTextGenerator } from "./drag_text.ts"; // Adjust path as needed
import type { DragTextContent } from "../../../types/H5P/content/drag-text.ts";
import type { TranslationPair } from "../../../types/types.ts";
import { testGetSupportedLibrary } from "../../../test/utils.ts";
import su from "../../../utils/string.ts";
import { genRandomNumbers } from "../../../utils/utils.ts";

function assertContent(
    content: DragTextContent | DragTextContent[],
): asserts content is DragTextContent[] {
    expect(Array.isArray(content)).toBe(true);
}
function assertContentDefined(content: DragTextContent | undefined): asserts content is DragTextContent {
    expect(content).toBeTruthy();
}
// Mock the utilities used by the generator
vi.mock("../../../utils/string.ts", () => ({
    default: {
        wrapLongestWord: vi.fn((str: string) => `*${str}*`),
    },
}));

vi.mock("../../../utils/utils.ts", () => ({
    genRandomNumbers: vi.fn(),
}));

describe("DragTextGenerator", () => {
    let generator: DragTextGenerator;
    let template: DragTextContent;

    beforeEach(() => {
        generator = new DragTextGenerator();
        template = {
            textField: "",
        } as unknown as DragTextContent;

        vi.clearAllMocks();
    });

    // Test library support contract matching your custom utility
    testGetSupportedLibrary(() => generator, "H5P.DragText");

    describe("generate", () => {
        it("should filter out words shorter than 4 characters", () => {
            const base: TranslationPair[] = [
                { source: "one", translation: "abc abccc abc" }, // length 3 -> skipped
                { source: "two", translation: "abc abccc abc abc" }, // length 4 -> included
            ];

            const result = generator.generate(base, template);

            // remainder = 1, lastAvailIndexes = 2. It triggers remainder logic.
            // Mock random index picker to select index 0 of longBase (which is "abcd")
            vi.mocked(genRandomNumbers).mockReturnValue([0, 0]);
            assertContent(result.content);
            expect(result.content).toHaveLength(1);
            // "abcd" wrapped twice (1 remainder + 2 random additions = 3 parts)
            const first = result.content[0];
            assertContentDefined(first);
            expect(first.textField).toBe("*abcd*\n*abcd*\n*abcd*\n");
        });

        it("should pack items cleanly into exact complete sets of three", () => {
            //@todo it should reject phrases shorter than a certain length
            const base: TranslationPair[] = [
                { source: "1", translation: "word1" },
                { source: "2", translation: "word2" },
                { source: "3", translation: "word3" },
            ];

            const result = generator.generate(base, template);

            assertContent(result.content);
            expect(result.content).toHaveLength(1);
            const first = result.content[0];
            assertContentDefined(first);
            expect(result.content).toHaveLength(1);
            expect(Array.isArray(result.content)).toBe(true);
            expect(first.textField).toBe("*word1*\n*word2*\n*word3*");
            expect(genRandomNumbers).not.toHaveBeenCalled();
        });

        it("should fill remainder sets using random samples from previous elements", () => {
            // 4 elements yields 1 complete set (3 items) and a remainder of 1 item
            const base: TranslationPair[] = [
                { source: "1", translation: "word1" },
                { source: "2", translation: "word2" },
                { source: "3", translation: "word3" },
                { source: "4", translation: "word4" },
            ];

            // Mock random index selector to pick 'word2' (index 1) to fill out the remaining slot
            vi.mocked(genRandomNumbers).mockReturnValue([1]);

            const result = generator.generate(base, template);
            assertContent(result.content);
            expect(result.content).toHaveLength(1);
            const first = result.content[0];
            const second = result.content[0];
            assertContentDefined(first);
            assertContentDefined(second);

            expect(result.content).toHaveLength(2);

            // Set 1 (Complete)
            expect(first.textField).toBe("*word1*\n*word2*\n*word3*");

            // Set 2 (Remainder filled out with mocked random selection)
            expect(second.textField).toBe("*word4*\n*word2*\n");

            // Assures random function targeted only the complete set bounds (offset 3)
            expect(genRandomNumbers).toHaveBeenCalledWith(1, 0, 3, []);
        });
    });
});
