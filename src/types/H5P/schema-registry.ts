import { z } from "zod";
import { dragTextContentSchema } from "./content/drag-text.ts"; // Your schemas
import { blanksContentSchema } from "./content/blanks.ts";
import type { LibraryNames } from "../types.ts";
import { generatorTemplateFinder } from "../../utils/utils.ts";
import { coursePresentationContentSchema } from "./content/course-presentation.ts";
import { multimediaChoiceContentSchema } from "./content/multimedia-choice.ts";
import { dialogcardsContentSchema } from "./content/dialog-cards.ts";
import { singleChoiceSetContentSchema } from "./content/single-choice-set.ts";
import { multiChoiceContentSchema } from "./content/multi-choice.ts";

// 1. Define the union of your H5P string literals
// export type H5PLibraryName = "H5P.DragText" | "H5P.Blanks"; // Add others here

// 2. Map the libraries directly to their actual Zod schemas
const schemaRegistry = {
  "H5P.DragText": dragTextContentSchema,
  "H5P.Blanks": blanksContentSchema,
  "H5P.CoursePresentation": coursePresentationContentSchema, // Placeholder for CoursePresentation schema
  "H5P.MultiMediaChoice": multimediaChoiceContentSchema, // Placeholder for MultiMediaChoice schema
  "H5P.Dialogcards": dialogcardsContentSchema, // Placeholder for Dialogcards schema
  "H5P.SingleChoiceSet": singleChoiceSetContentSchema, // Placeholder for SingleChoiceSet schema
  "H5P.MultiChoice": multiChoiceContentSchema, // Placeholder for MultiChoice schema
} as const satisfies Record<LibraryNames, z.ZodTypeAny>;

// 3. Create a helper utility type to automatically map the return shape
export type InferTemplateType<T extends LibraryNames> = z.infer<typeof schemaRegistry[T]>;

export function getValidatedTemplate<T extends LibraryNames>(library: T): InferTemplateType<T> {
  // 1. Fetch the raw un-typed data
  const rawData = generatorTemplateFinder(library);
  
  // 2. Pull the matching schema safely from the registry
  const schema = schemaRegistry[library] as unknown as z.ZodType<InferTemplateType<T>>;
  
  // 3. Parse and validate. This instantly destroys the 'any' type.
  // Using .parse() throws an explicit error if the JSON is corrupted or invalid.
  return schema.parse(rawData);
}
