import type { 
  ContentGenerator,
  JsonValue,
  LibraryNames,
  TranslationPair,
  
} from "../../../types/types.ts"
import { 
  coursePresentationSlideLibraries,
  
} from "../../../types/types.ts"
import type { CoursePresentationContent } from "../../../types/H5P/course-presentation.ts";

class CoursePresentationGenerator implements ContentGenerator {
  actionLibraryRenderers: ContentGenerator[];
  constructor(libraryRenderers: ContentGenerator[]) {
    this.actionLibraryRenderers = libraryRenderers;
  }
  /*
    @todo some libraries should have multiple slides generated for them, e.g. MultiChoice, SingleChoiceSet, Blanks, etc.
  */
  generate(base: TranslationPair[], template: CoursePresentationContent) {
    template.presentation.slides.forEach((slide, i) => {
      if (!Array.isArray(slide)) throw new Error("bad template - no elements array")

      slide.forEach((element, j) => {
        //@todo - using types but maybe zod validation would be better for this
        // if (typeof element.action !== "object") throw new Error("bad templ");
        const lib = element.action.library;
        if (typeof lib === "string") {
          const gen = this.actionLibraryRenderers.find((generator): boolean => {
            const libName = element.action.library.trim().split(" ")[0];

            return (generator.getSupportedLibrary() === libName)
          })
          if (gen) {
            if(this.isSlideLibrary(gen.getSupportedLibrary())) return 
            console.log(`slide no. ${i + 1}: generating ...${gen.getSupportedLibrary()}`)
            element.action.params = gen.generate(base, element.action.params);
          }

        }
      })

    })
    return template;

    //get template
    // const templ = (template as any);
    // if (!templ.presentation) throw new Error("bad template - no presentation in template");

    // if (!Array.isArray(templ.presentation.slides))
    //   throw Error("bad template - no slides in json")

    // const slides = templ.presentation.slides as any[];

    // slides.forEach((slide, i) => {

    //   //trasverse template for know generatable types
    //   //generate for base data

    // });
  }
  isSlideLibrary(libName: string) {
     return (coursePresentationSlideLibraries as readonly string[]).includes(libName);
  }
  loadTemplate() {
    return JSON.parse("");
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.CoursePresentation";
  }
}
