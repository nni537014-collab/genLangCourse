import { beforeEach, describe, expect, it, vi } from "vitest";
import { DialogCardsGenerator } from "./dialog_cards.ts";
import type {
    TranslationPair,
    generatorWriteData,
} from "../../../types/types.ts";
import type { DialogcardsContent } from "../../../types/H5P/content/dialog-cards.ts";
import { testGetSupportedLibrary } from "../../../test/utils.ts";
import { getAudioH5pRelativePath } from "../../../utils/paths/audio.ts";

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
        it("returns the correct library name", () => {
            expect(generator.getSupportedLibrary()).toBe("H5P.Dialogcards");
        });
    });

    testGetSupportedLibrary(() => generator, "H5P.Dialogcards");

    describe("generate", () => {
        it("maps translation pairs into dialogs", () => {
            const base: TranslationPair[] = [
                {
                    source: "Hello",
                    translation: "Hei",
                },
                {
                    source: "World",
                    translation: "Verden",
                },
            ];

            const result: generatorWriteData<DialogcardsContent> =
                generator.generate(base, template);
            if (Array.isArray(result.content)) throw new Error("wrong return type");
            expect(result.content).toBe(template);

            expect(result.content.dialogs).toEqual([
                {
                    text: "<p style=\"text-align:center;\">Hello</p>",
                    answer: "<p style=\"text-align:center;\">Hei</p>",
                    tips: {},
                    audio: [
                        {
                            path: "audio/Hei.mp3",
                            mime: "audio/mpeg",
                            copyright: {
                                license: "U",
                            },
                        },
                    ],
                },
                {
                    text: "<p style=\"text-align:center;\">World</p>",
                    answer: "<p style=\"text-align:center;\">Verden</p>",
                    tips: {},
                    audio: [
                        {
                            path: "audio/Verden.mp3",
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

    describe("createDialogs", () => {
        it("creates dialog objects for each translation pair", () => {
            vi.mocked(getAudioH5pRelativePath).mockReturnValue("foo.mp3");

            const dialogs = generator.createDialogs([
                {
                    source: "One",
                    translation: "En",
                },
            ]);

            expect(dialogs).toEqual([
                {
                    text: "<p style=\"text-align:center;\">One</p>",
                    answer: "<p style=\"text-align:center;\">En</p>",
                    tips: {},
                    audio: [
                        {
                            path: "foo.mp3",
                            mime: "audio/mpeg",
                            copyright: {
                                license: "U",
                            },
                        },
                    ],
                },
            ]);
        });
    });

    describe("generate", () => {
        it("throws if template is null", () => {
            expect(() =>
                generator.generate([], null as unknown as DialogcardsContent),
            ).toThrow();
        });
    });
});