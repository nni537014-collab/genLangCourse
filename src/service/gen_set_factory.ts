import type { GenSet, LibraryNames, WrittenH5PArchive } from "../types/types.ts";
import { BlanksGenerator } from "./generators/content/blanks.ts";
import { BlankH5pGenerator } from "./generators/h5p/blanks.ts";
import { BlanksWriter } from "./writers/blanks.ts";
import { paths } from "../utils/paths.ts"
import { MultiMediaChoiceGenerator } from "./generators/content/multi_media_choice.ts";
import { DialogCardsGenerator } from "./generators/content/dialog_cards.ts";
import { SingleChoiceSetGenerator } from "./generators/content/single_choice_set.ts";
import { MultiChoiceGenerator } from "./generators/content/multi_choice.ts";
import { DragTextGenerator } from "./generators/content/drag_text.ts";
import { MultiMediaChoiceWriter } from "./writers/multi_media_choice.ts";
import { DialogCardsWriter } from "./writers/dialog_cards.ts";
import { SingleChoiceSetWriter } from "./writers/single_choice_set.ts";
import { MultiChoiceWriter } from "./writers/multi_choice.ts";
import DragTextWriter from "./writers/drag_text.ts";
import { MultiMediaChoiceH5pGenerator } from "./generators/h5p/multi_media_choice.ts";
import { DialogCardsH5pGenerator } from "./generators/h5p/dialog_cards.ts";
import { SingleChoiceSetH5pGenerator } from "./generators/h5p/single_choice_set.ts";
import { MultiChoiceH5pGenerator } from "./generators/h5p/multi_choice.ts";
import { DragTextH5pGenerator } from "./generators/h5p/drag_text.ts";

 const writtenH5PArchive: WrittenH5PArchive = {
     "H5P.Blanks": new Set<string>,
     "H5P.Dialogcards" : new Set<string>,
     "H5P.DragText": new Set<string>,
     "H5P.MultiChoice": new Set<string>,
     "H5P.MultiMediaChoice": new Set<string>,
     "H5P.SingleChoiceSet": new Set<string>,
     "H5P.CoursePresentation": new Set<string>
 }
export function createGenSet(libraryName: LibraryNames) {
    let genSet: GenSet;

    switch (libraryName) {
        case "H5P.Blanks":
            genSet = {
                content: new BlanksGenerator(),
                h5p: new BlankH5pGenerator(),
                writer: new BlanksWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        case "H5P.MultiMediaChoice":
            genSet = {
                content: new MultiMediaChoiceGenerator(),
                h5p: new MultiMediaChoiceH5pGenerator(),
                writer: new MultiMediaChoiceWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        case "H5P.Dialogcards":
            genSet = {
                content: new DialogCardsGenerator(),
                h5p: new DialogCardsH5pGenerator(),
                writer: new DialogCardsWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        case "H5P.SingleChoiceSet":
            genSet = {
                content: new SingleChoiceSetGenerator(),
                h5p: new SingleChoiceSetH5pGenerator(),
                writer: new SingleChoiceSetWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        case "H5P.MultiChoice":
            genSet = {
                content: new MultiChoiceGenerator(),
                h5p: new MultiChoiceH5pGenerator(),
                writer: new MultiChoiceWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        case "H5P.MultiMediaChoice":
            genSet = {
                content: new MultiMediaChoiceGenerator(),
                h5p: new MultiMediaChoiceH5pGenerator(),
                writer: new MultiMediaChoiceWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        case "H5P.DragText":
            genSet = {
                content: new DragTextGenerator(),
                h5p: new DragTextH5pGenerator(),
                writer: new DragTextWriter(paths.getWrite(), writtenH5PArchive[libraryName]),
            }
            break;
        default:
            throw new Error("never should run");
    }
    return genSet;
}
