import type {
  ContentGenerator,

  CoursePresentationSlideLibraries,
  LibraryNames,
  TranslationPair,
} from "../../../types/types.ts";
import {
  coursePresentationSlideLibraries,
  type GeneratorAudio,
  libraryNames,
} from "../../../types/types.ts";
import type {
  CoursePresentationContent,
  Slide,
} from "../../../types/H5P/content/course-presentation.ts";
import type { MultiChoiceContent } from "../../../types/H5P/content/multi-choice.ts";
import type { DragTextContent } from "../../../types/H5P/content/drag-text.ts";
import type { MultimediaChoiceContent } from "../../../types/H5P/content/multimedia-choice.ts";
import type { CoursePresentationGeneratorRegistry } from "../../../types/H5P/generator-mapping.ts";
// import type { MultiChoiceContent } from "../../../types/H5P/content/multi-choice.ts";
// import type { MultimediaChoiceContent } from "../../../types/H5P/content/multimedia-choice.ts";
// import type { DragTextContent } from "../../../types/H5P/content/drag-text.ts";
// import { MultiMediaChoiceGenerator } from "./multi_media_choice.ts";

export class CoursePresentationGenerator implements ContentGenerator {
  actionLibraryRenderers: ContentGenerator[];
  generatorRegistry: CoursePresentationGeneratorRegistry;
  audio = new Set<GeneratorAudio>();
  constructor(
    libraryRenderers: ContentGenerator[],
    generatorRegistry: CoursePresentationGeneratorRegistry,
  ) {
    this.actionLibraryRenderers = libraryRenderers;
    this.generatorRegistry = generatorRegistry;
  }
  /*
    @todo some libraries should have multiple slides generated for them, e.g. MultiChoice, SingleChoiceSet, Blanks, etc.
  */
  generate(base: TranslationPair[], template: CoursePresentationContent) {
    for (
      let slideIndex = 0;
      template.presentation.slides.length;
      slideIndex++
    ) {
      const slide = template.presentation.slides[slideIndex];
      if (!slide) throw new Error("bad data");
      const libName = this.findLibraryName(slide);

      if (libName) {
        const gen = this.getGenerator(libName);
        if (!gen) throw new Error(`no generator found for library ${libName}`);
        const el = this.findElementInSlide(slide);
        if (!el) throw new Error("no element found in slide");
        if (this.isSlideLibrary(libName)) {
          let generatedLength = 0;
          switch (el.action.library) {
            case "H5P.MultiChoice": {
              let generated = this.generatorRegistry[
                el.action.library
              ].generate(base, el.action.params);
              let content: MultiChoiceContent[];
              if (!Array.isArray(generated.content))
                content = [generated.content];
              else content = generated.content;
              content.forEach((gen, contentIndex) => {
                const newSlide = structuredClone(slide) as Slide;
                const newEl = this.findElementInSlide(newSlide);
                if (!newEl) throw new Error("no element found in slide");
                // if (newEl.action.library !== "H5P.MultiChoice") throw new Error("bad data");
                newEl.action.params = gen;
                const insertIndex = slideIndex + contentIndex;
                template.presentation.slides.splice(insertIndex, 0, newSlide);
              });
              this.mergeAudio(generated.audio);
              generatedLength = content.length;
              break;
            }
            case "H5P.DragText": {
              const generated = this.generatorRegistry[
                el.action.library
              ].generate(base, el.action.params);
              let content: DragTextContent[];
              if (!Array.isArray(generated.content))
                content = [generated.content];
              else content = generated.content;
              content.forEach((gen, contentIndex) => {
                const newSlide = structuredClone(slide) as Slide;
                const newEl = this.findElementInSlide(newSlide);
                if (!newEl) throw new Error("no element found in slide");
                // if (newEl.action.library !== "H5P.DragText") throw new Error("bad data");
                newEl.action.params = gen;
                const insertIndex = slideIndex + contentIndex;
                template.presentation.slides.splice(insertIndex, 0, newSlide);
              });
              this.mergeAudio(generated.audio);
              generatedLength += content.length;
              break;
            }
            case "H5P.MultiMediaChoice": {
              const generated = this.generatorRegistry[
                el.action.library
              ].generate(base, el.action.params);
              let content: MultimediaChoiceContent[];
              if (!Array.isArray(generated.content))
                content = [generated.content];
              else content = generated.content;
              content.forEach((gen, contentIndex) => {
                const newSlide = structuredClone(slide) as Slide;
                const newEl = this.findElementInSlide(newSlide);
                if (!newEl) throw new Error("no element found in slide");
                // if (newEl.action.library !== "H5P.MultiMediaChoice") throw new Error("bad data");
                newEl.action.params = gen;
                const insertIndex = slideIndex + contentIndex;
                template.presentation.slides.splice(insertIndex, 0, newSlide);
              });
              this.mergeAudio(generated.audio);
              generatedLength += content.length;
            }
          }
          slideIndex += generatedLength;

          // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
          //clone slide and add to presentation.slides
        } else {
          switch (el.action.library) {
            case "H5P.Blanks": {
              const gen = this.generatorRegistry[el.action.library].generate(
                base,
                el.action.params,
              );
              const content = Array.isArray(gen.content)
                ? gen.content.pop()
                : gen.content;
              if (!content) throw new Error("bad generator");
              this.mergeAudio(gen.audio);
              el.action.params = content;
              break;
            }
            case "H5P.Dialogcards": {
              const gen = this.generatorRegistry[el.action.library].generate(
                base,
                el.action.params,
              );
              const content = Array.isArray(gen.content)
                ? gen.content.pop()
                : gen.content;
              if (!content) throw new Error("bad generator");
              this.mergeAudio(gen.audio);
              el.action.params = content;
              break;
            }
            case "H5P.SingleChoiceSet": {
              const gen = this.generatorRegistry[el.action.library].generate(
                base,
                el.action.params,
              );

              const content = Array.isArray(gen.content)
                ? gen.content.pop()
                : gen.content;
              if (!content) throw new Error("bad generator");
              this.mergeAudio(gen.audio);
              el.action.params = content;
              break;
            }
          }
        }
      }
    }
    return { content: template, audio: this.audio };
    // template.presentation.slides.forEach((slide, i) => {
    //   const libName = this.findLibraryName(slide);
    //   if (libName) {
    //     const gen = this.actionLibraryRenderers.find((generator): boolean => {
    //       return generator.getSupportedLibrary() === libName;
    //     });
    //     if (!gen) throw new Error(`no generator found for library ${libName}`);
    //     if (this.isSlideLibrary(libName)) {
    //       // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
    //       //clone slide and add to presentation.slides
    //     } else {
    //     }
    //   }

    //   slide.elements.forEach((element, j) => {
    //     //@todo - using types but maybe zod validation would be better for this
    //     // if (typeof element.action !== "object") throw new Error("bad templ");
    //     const lib = element.action.library;

    //     const gen = this.getGenerator(lib);
    //     if (gen) {
    //       if (this.isSlideLibrary(gen.getSupportedLibrary())) {
    //         // @todo - generate multiple slides for this slide, e.g. MultiChoice etc.
    //         //clone slide and add to presentation.slides
    //       } else {
    //         console.log(
    //           `slide no. ${i + 1}: generating ...${gen.getSupportedLibrary()}`,
    //         );
    //         // element.action.params = gen.generate(base, element.action.params);
    //       }
    //     }
    //   });
    // });

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
  mergeAudio(audio: Set<GeneratorAudio> | undefined) {
    if (!audio) return;
    this.audio = this.audio.union(audio);
  }
  getSupportedLibrary(): LibraryNames {
    return "H5P.CoursePresentation";
  }
}
