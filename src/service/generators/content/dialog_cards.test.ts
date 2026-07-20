import { beforeEach, describe, expect, it, vi } from "vitest";
import { DialogCardsGenerator } from "./dialog_cards.ts";
import type {
    TranslationPair,
    generatorWriteData,
} from "../../../types/types.ts";
import type { DialogcardsContent } from "../../../types/H5P/content/dialog-cards.ts";
import { testGetSupportedLibrary } from "../../../test/utils.ts";
import { getAudioH5pRelativePath } from "../../../utils/paths/audio.ts";

function assertContent(
    content: DialogcardsContent | DialogcardsContent[],
): asserts content is DialogcardsContent {
    expect(Array.isArray(content)).toBe(false);
}

vi.mock("../../../utils/paths/audio.ts", () => ({
    getAudioH5pRelativePath: vi.fn(),
}));

describe("DialogCardsGenerator", () => {
    let generator: DialogCardsGenerator;
    let template: DialogcardsContent;

    beforeEach(() => {
        generator = new DialogCardsGenerator();
        template = {
            dialogs: [],
        } as unknown as DialogcardsContent;

        vi.clearAllMocks();

        vi.mocked(getAudioH5pRelativePath).mockImplementation(
            (text: string) => `audio/${text}.mp3`,
        );
    });

    describe("getSupportedLibrary", () => {
        it("should return the correct library name", () => {
            expect(generator.getSupportedLibrary()).toBe("H5P.Dialogcards");
        });
    });

    testGetSupportedLibrary(() => generator, "H5P.Dialogcards");

    describe("generate", () => {
        it("should populate dialogs and return the template", () => {
            const base: TranslationPair[] = [
                { source: "Hello", translation: "Hei" },
                { source: "World", translation: "Verden" },
            ];

            const result: generatorWriteData<DialogcardsContent> =
                generator.generate(base, template);
            assertContent(result.content);
            expect(result.content).toBe(template);

            expect(result.content.dialogs).toEqual([
                {
                    text: '<p style="text-align:center;">Hello</p>',
                    answer: '<p style="text-align:center;">Hei</p>',
                    tips: {},
                    audio: [
                        {
                            path: getAudioH5pRelativePath("Hei", "translation"), //"audio/Hei.mp3",
                            mime: "audio/mpeg",
                            copyright: {
                                license: "U",
                            },
                        },
                    ],
                },
                {
                    text: '<p style="text-align:center;">World</p>',
                    answer: '<p style="text-align:center;">Verden</p>',
                    tips: {},
                    audio: [
                        {
                            path: getAudioH5pRelativePath("Verden", "translation"),//"audio/Verden.mp3",
                            mime: "audio/mpeg",
                            copyright: {
                                license: "U",
                            },
                        },
                    ],
                },
            ]);

            expect(getAudioH5pRelativePath).toHaveBeenNthCalledWith(
                1,
                "Hei",
                "translation",
            );
            expect(getAudioH5pRelativePath).toHaveBeenNthCalledWith(
                2,
                "Verden",
                "translation",
            );
        });

    });
});