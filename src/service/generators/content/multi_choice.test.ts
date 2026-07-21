import { describe, it, expect, vi, beforeEach } from "vitest";
import { MultiChoiceGenerator } from "./multi_choice.ts";
import type { TranslationPair, generatorWriteData } from "../../../types/types.ts";
import type { MultiChoiceContent } from "../../../types/H5P/content/multi-choice.ts";
import { testGetSupportedLibrary } from "../../../test/utils.ts";

// Mock external utilities
vi.mock("../../../utils/utils.ts", () => ({
  genRandomNumbers: vi.fn(() => [1, 2, 3]), // Returns indexes for wrong answers
}));

vi.mock("../../../utils/paths/audio.ts", () => ({
  getAudioH5pRelativePath: vi.fn((text, type) => `path/to/${text}-${type}.mp3`),
}));

describe("MultiChoiceGenerator", () => {
  let generator: MultiChoiceGenerator;
  let mockTemplate: MultiChoiceContent;

  beforeEach(() => {
    generator = new MultiChoiceGenerator();
    
    // Minimal structured representation matching generator expectations
    mockTemplate = {
      media: {
        type: {
          params: {
            files: [{ path: "" }],
          },
        },
      },
      question: "",
      answers: [{ correct: false, text: "" }],
    } as unknown as MultiChoiceContent;

    vi.clearAllMocks();
  });

  describe("getSupportedLibrary", () => {
    testGetSupportedLibrary(() => generator, "H5P.MultiChoice");
  });

  describe("generate", () => {
    it("should successfully generate content and collect audio metadata", () => {
      const base: TranslationPair[] = [
        { source: "One", translation: "En" },
        { source: "Two", translation: "To" },
        { source: "Three", translation: "Tre" },
        { source: "Four", translation: "Fire" },
      ];

      const result: generatorWriteData<MultiChoiceContent> = generator.generate(base, mockTemplate);

      // Verify shape of generated output
      expect(Array.isArray(result.content)).toBe(true);
      expect(result.content).toHaveLength(4);

      // Verify structural mutation & audio tracking for first pair
      const firstEntry = result.content[0];
      expect(firstEntry.question).toBe("<p>Listen and then select the correct answer</p>");
      expect(firstEntry.media.type.params.files[0].path).toBe("path/to/En-translation.mp3");

      // Verify correct and incorrect answer mappings
      expect(firstEntry.answers).toHaveLength(4);
      expect(firstEntry.answers[0]).toEqual({ correct: true, text: "<div>One</div>" });
      expect(firstEntry.answers[1]).toEqual({ correct: false, text: "<div>To</div>" });

      // Check audio track tracking state
      expect(result.audio.size).toBe(4);
    });

    it("should throw bad data error if template media files are missing", () => {
      const base: TranslationPair[] = [{ source: "One", translation: "En" }];
      const badTemplate = { media: { type: { params: { files: [] } } } } as unknown as MultiChoiceContent;

      expect(() => generator.generate(base, badTemplate)).toThrow("bad data");
    });
  });
});
