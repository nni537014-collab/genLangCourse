// import type { 
//   CoursePresentationGeneratorRegistry,
//   CoursePresentationLibraryNames,
//   generatorMapping
// } from "../types/types.ts";
import { CoursePresentationGeneratorRegistry } from "../types/H5P/generator-mapping.ts";
import { BlanksGenerator } from "./generators/content/blanks.ts";
// import { CoursePresentationGenerator } from "./generators/content/course_presentation.ts";
import { DialogCardsGenerator } from "./generators/content/dialog_cards.ts";
import { DragTextGenerator } from "./generators/content/drag_text.ts";
import { MultiChoiceGenerator } from "./generators/content/multi_choice.ts";
import { MultiMediaChoiceGenerator } from "./generators/content/multi_media_choice.ts";
import { SingleChoiceSetGenerator } from "./generators/content/single_choice_set.ts";

export const generatorRegistry: CoursePresentationGeneratorRegistry = {
  "H5P.Blanks": new BlanksGenerator(),
  "H5P.SingleChoiceSet": new SingleChoiceSetGenerator(),
  "H5P.MultiMediaChoice": new MultiMediaChoiceGenerator(),
  "H5P.Dialogcards": new DialogCardsGenerator(),
  "H5P.MultiChoice": new MultiChoiceGenerator(),
  "H5P.DragText": new DragTextGenerator(),
} 