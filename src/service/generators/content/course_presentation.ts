import type {
  ContentGenerator,
  JsonValue,
  LibraryNames,
  TranslationPair,

} from "../../../types/types.ts"
import {
  coursePresentationSlideLibraries,
  libraryNames,

} from "../../../types/types.ts"
import type { CoursePresentationContent, Slide } from "../../../types/H5P/course-presentation.ts";

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
      if (!Array.isArray(slide.elements)) throw new Error("bad template - no elements array")
      if (this.cloneRequired(slide)) {
        // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
        //clone slide and add to presentation.slides
      } else {

      }
      slide.elements.forEach((element, j) => {
        //@todo - using types but maybe zod validation would be better for this
        // if (typeof element.action !== "object") throw new Error("bad templ");
        const lib = element.action.library;

        const gen = this.actionLibraryRenderers.find((generator): boolean => {
          const libName = element.action.library.trim().split(" ")[0];

          return (generator.getSupportedLibrary() === libName)
        })
        if (gen) {
          if (this.isSlideLibrary(gen.getSupportedLibrary())) {
            // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
            //clone slide and add to presentation.slides

          } else {
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
  isContentLibrary(libName: string) {
    return (libraryNames as readonly string[]).includes(libName);
  }
  cloneRequired(slide: Slide): boolean {
    return slide.elements.some((element) => {
      return this.isSlideLibrary(element.action.library);
    });
  }
  findLibraryName(slide: Slide): string | undefined {
    let libName: string | undefined;
    slide.elements.forEach((element) => {
      if (this.isContentLibrary(element.action.library)) {
        if (typeof libName === "undefined") libName = element.action.library;
        else throw new Error("multiple content libraries found in slide - cannot generate");
      };
    });
    return libName;
  }
  // loadTemplate() {
  //   return JSON.parse("");
  // }
  getSupportedLibrary(): LibraryNames {
    return "H5P.CoursePresentation";
  }
}
