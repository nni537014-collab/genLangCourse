import type {
  ContentGenerator,
  LibraryNames,
  TranslationPair,
} from "../../../types/types.ts";
import {
  coursePresentationSlideLibraries,
  libraryNames,
} from "../../../types/types.ts";
import type {
  CoursePresentationContent,
  Slide,
} from "../../../types/H5P/content/course-presentation.ts";
import { BlanksGenerator } from "./blanks.ts";

class CoursePresentationGenerator implements ContentGenerator {
  actionLibraryRenderers: ContentGenerator[];
  constructor(libraryRenderers: ContentGenerator[]) {
    this.actionLibraryRenderers = libraryRenderers;
  }
  /*
    @todo some libraries should have multiple slides generated for them, e.g. MultiChoice, SingleChoiceSet, Blanks, etc.
  */
  generate(base: TranslationPair[], template: CoursePresentationContent) {
    for (let i = 0; template.presentation.slides.length; i++) {
      const slide = template.presentation.slides[i];
      if (!slide) throw new Error("bad data");
      const libName = this.findLibraryName(slide);
      if (libName) {
        const gen = this.getGenerator(libName);
        if (!gen) throw new Error(`no generator found for library ${libName}`);
        const el = this.findElementInSlide(slide);
        if (!el) throw new Error("no element found in slide");
        if (this.isSlideLibrary(libName)) {
          // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
          //clone slide and add to presentation.slides
        } else {
          const generated = gen.generate(base, el.action.params);
          switch (el.action.library) {
            case "H5P.Blanks":
              if (!(gen instanceof BlanksGenerator)) throw Error("");
              el.action.params = gen.generate(base, el.action.params);
          }
          if (Array.isArray(generated))
            throw new Error("content should be object not array");
        }
      }
    }
    template.presentation.slides.forEach((slide, i) => {
      const libName = this.findLibraryName(slide);
      if (libName) {
        const gen = this.actionLibraryRenderers.find((generator): boolean => {
          return generator.getSupportedLibrary() === libName;
        });
        if (!gen) throw new Error(`no generator found for library ${libName}`);
        if (this.isSlideLibrary(libName)) {
          // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
          //clone slide and add to presentation.slides
        } else {
        }
      }

      slide.elements.forEach((element, j) => {
        //@todo - using types but maybe zod validation would be better for this
        // if (typeof element.action !== "object") throw new Error("bad templ");
        const lib = element.action.library;

        const gen = this.getGenerator(lib);
        if (gen) {
          if (this.isSlideLibrary(gen.getSupportedLibrary())) {
            // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
            //clone slide and add to presentation.slides
          } else {
            console.log(
              `slide no. ${i + 1}: generating ...${gen.getSupportedLibrary()}`,
            );
            element.action.params = gen.generate(base, element.action.params);
          }
        }
      });
    });
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
  getGenerator(libName: LibraryNames) {
    return this.actionLibraryRenderers.find((generator): boolean => {
      return generator.getSupportedLibrary() === libName;
    });
  }
  isSlideLibrary(libName: string) {
    return (coursePresentationSlideLibraries as readonly string[]).includes(
      libName,
    );
  }
  isContentLibrary(libName: string) {
    return (libraryNames as readonly string[]).includes(libName);
  }
  cloneRequired(slide: Slide): boolean {
    return slide.elements.some((element) => {
      return this.isSlideLibrary(element.action.library);
    });
  }
  // @todo move to utils?
  libToLibName(lib: string) {
    const res = lib.trim().split(" ")[0];
    if (res) {
      if (this.isContentLibrary(res)) {
        return res as LibraryNames;
      }
    }
  }
  findElementInSlide(slide: Slide) {
    return slide.elements.find((el) =>
      this.isContentLibrary(el.action.library),
    );
  }
  findLibraryName(slide: Slide) {
    let libName: LibraryNames | undefined;
    slide.elements.forEach((element) => {
      const canditate = this.libToLibName(element.action.library);
      if (canditate) {
        if (!libName) libName = canditate;
        else throw new Error("more than one content library in slide");
      }
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
