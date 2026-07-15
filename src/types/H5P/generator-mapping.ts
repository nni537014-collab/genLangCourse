import type { BlanksGenerator } from "../../service/generators/content/blanks.ts";
// import type { CoursePresentationGenerator } from "../../service/generators/content/course_presentation.ts";
import type { DialogCardsGenerator } from "../../service/generators/content/dialog_cards.ts";
import type { DragTextGenerator } from "../../service/generators/content/drag_text.ts";
import type { MultiChoiceGenerator } from "../../service/generators/content/multi_choice.ts";
import type { MultiMediaChoiceGenerator } from "../../service/generators/content/multi_media_choice.ts";
import type { SingleChoiceSetGenerator } from "../../service/generators/content/single_choice_set.ts";
import type { LibraryNames } from "../types.ts";

export interface generatorMapping {
  "H5P.Blanks": BlanksGenerator;
  "H5P.SingleChoiceSet": SingleChoiceSetGenerator;
  "H5P.MultiMediaChoice": MultiMediaChoiceGenerator;
  "H5P.Dialogcards": DialogCardsGenerator;
  "H5P.MultiChoice": MultiChoiceGenerator;
  "H5P.DragText": DragTextGenerator;
//   "H5P.CoursePresentation": CoursePresentationGenerator;
}
export type CoursePresentationLibraryNames = Exclude<
  LibraryNames,
  "H5P.CoursePresentation"
>;

export type CoursePresentationGeneratorRegistry = {
  [K in CoursePresentationLibraryNames]: generatorMapping[K];
};