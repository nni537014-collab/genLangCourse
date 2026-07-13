// import type { LibraryNames } from "../../types.ts";
import type { BlanksContent } from "./blanks.ts";
import type { DialogcardsContent } from "./dialog-cards.ts";
import type { DragTextContent } from "./drag-text.ts";
import type { MultiChoiceContent } from "./multi-choice.ts";
import type { MultimediaChoiceContent } from "./multimedia-choice.ts";
import type { SingleChoiceSetContent } from "./single-choice-set.ts";
import type { CoursePresentationContent } from "./course-presentation.ts";

export type H5PContent =
  | BlanksContent
  | DialogcardsContent
  | DragTextContent
  | MultiChoiceContent
  | MultimediaChoiceContent
  | SingleChoiceSetContent
  | CoursePresentationContent;