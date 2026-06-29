import type { ContentGenerator, JsonValue, LibraryNames, TranslationPair } from "../../../types/types.ts"

class CoursePresentationGenerator implements ContentGenerator {
  actionLibraryRenderers:  ContentGenerator[];
  constructor(libraryRenderers: ContentGenerator[]){
    this.actionLibraryRenderers = libraryRenderers;
  }
  generate(base: TranslationPair[], template: JsonValue):JsonValue {

    //get template
    const templ = (template as any);
    if(!templ.presentation) throw new Error("bad template - no presentation in template");

    if (!Array.isArray(templ.presentation.slides))
       throw Error("bad template - no slides in json")

            const slides = templ.presentation.slides as any[];
    slides.forEach( (slide, i) => {
      if(!Array.isArray(slide)) throw new Error("bad template - no elements array")

              slide.forEach( element => {
        if(typeof element?.action !== "object") throw new Error("bad templ");
        const lib = element.action.library;
        if(typeof lib === "string"){
            const gen = this.actionLibraryRenderers.find((generator): boolean=> {
            const libName = lib.trim().split(" ")[0];
                        
              return (generator.getSupportedLibrary() === libName)
            })
            if (gen){
                console.log(`slide no. ${i+1}: generating ...${ gen.getSupportedLibrary() }`)
                element.action.params = gen.generate(base, element.action.params);  
            }

        }
    })
  
      //trasverse template for know generatable types
    //generate for base data

    return false;
  })
   return false;
}
  loadTemplate() {
    return JSON.parse("");
  }
  getSupportedLibrary(): LibraryNames {
      return "H5P.CoursePresentation";
  }
}
