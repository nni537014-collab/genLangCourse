import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlanksGenerator } from "./blanks.ts";
import su from "../../../utils/string.ts";
import type { generatorWriteData, TranslationPair } from "../../../types/types.ts";
import type { BlanksContent } from "../../../types/H5P/content/blanks.ts";
import { testGetSupportedLibrary } from "../../../test/utils.ts";

// Mock the string utility
vi.mock("../../../utils/string.ts", () => ({
  default: {
    wrap: vi.fn(),
    wrapLongestWord: vi.fn(),
  },
}));

describe("BlanksGenerator", () => {
  let generator: BlanksGenerator;
  let mockTemplate: BlanksContent;

  beforeEach(() => {
    generator = new BlanksGenerator();
    mockTemplate = { questions: [] } as unknown as BlanksContent;
    vi.clearAllMocks();
  });

  describe("getSupportedLibrary", () => {
    it("should return the correct library name", () => {
      expect(generator.getSupportedLibrary()).toBe("h5p.blanks");
    });
  });
  testGetSupportedLibrary(()=> generator, "H5P.Blanks");



  describe("generate", () => {
    it("should map translation pairs to questions and return the updated template", () => {
      const base: TranslationPair[] = [
        { source: "Hello", translation: "Hei" },
        { source: "World", translation: "Verden" },
      ];

      // Spy on generateBlank to control its output
      // vi.spyOn(generator, "generateBlank")
      
        // .mockReturnValueOnce("<p>*Hei*</p>")
        // .mockReturnValueOnce("<p>*Verden*</p>");
      
      const result: generatorWriteData<BlanksContent> = generator.generate(base, mockTemplate);
      //@todo remove the need for this
      if(Array.isArray(result.content)) throw new Error("need to sort this ");
      // expect(generator.generateBlank).toHaveBeenCalledTimes(2);
      expect(result.content.questions).toEqual([
        "<p>*Hei*</p>",
        "<p>*Verden*</p>",
      ]);
      expect(result.content).toBe(mockTemplate);
    });
  });
});
