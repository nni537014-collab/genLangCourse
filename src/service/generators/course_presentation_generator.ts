import type { ContentGenerator, JsonValue, TranslationPair } from "./../../types/types.ts"

class CoursePresentationGenerator implements ContentGenerator {
  actionLibraryRenderers:  ContentGenerator[];
  constructor(libraryRenderers: ContentGenerator[]){
    this.actionLibraryRenderers = libraryRenderers;
  }
  generate(base: TranslationPair[], template: JsonValue) {

    //get template
    const templ = (template as any);
    if(!templ.presentation) throw new Error("bad template - no presentation in template");

    if (!Array.isArray(templ.presentation.slides))
       throw Error("bad template - no slides in json")

            const slides = templ.presentation.slides as any[];
    slides.forEach( (slide, i) => {
      if(!Array.isArray(slide)) throw new Error("bad template - no elements array")

              slide.forEach( element => {
        if(typeof element?.action !== "object" &&
          typeof element.action?.library !== "string"
        ) throw new Error("bad templ");
        const gen = this.actionLibraryRenderers.find((generator): boolean=> {
            return (generator.getSupportedLibrary === element.action?.library)
         })
        if (gen){
          console.log(`slide no. ${i+1}: generating ...${ gen.getSupportedLibrary() }`)
           element.action.params = gen.generate(base, element.action.params);  
        }

      })
    })
  
      //trasverse template for know generatable types
    //generate for base data

    return false;
  }
  loadTemplate() {
    return JSON.parse("");
  }
  getSupportedLibrary(): string {
      return "H5P.CoursePresentation";
  }
}
