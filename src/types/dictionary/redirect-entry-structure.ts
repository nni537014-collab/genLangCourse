import * as z from "zod";


export const RedirectEntryStructureElementSchema = z.object({
    "title": z.string(),
    "redirect": z.string(),
    "pos": z.string(),
});
export type RedirectEntryStructureElement = z.infer<typeof RedirectEntryStructureElementSchema>;
