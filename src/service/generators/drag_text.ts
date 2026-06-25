import type {
  TranslationPair,
  JsonValue,
  ContentGenerator,

} from "./../../types/types.ts";
import { md5Filename } from "./../utils.ts"

export class DragTextGenerator implements ContentGenerator {
  generate(base: TranslationPair[], template: JsonValue): JsonValue[] {
     /**
     @todo add simlr funcionality to other generators
     base param filtered for length as it makes sense
     for this exercise
     */
     const longBase = base.filter(tp => (tp.translation.length < 4));
     const remainder = 3 - (longBase.length % 3)
     const numberOfLoops = Math.floor(longBase.length / 3);
     for(let i = 0; i < longBase.length; i += 3){
       let lastRun = false;
       if(i+2 >= longBase.length){
         lastRun = true;
       } else {
         
         const part1 = longBase[i]
         const part2 = longBase[i+1]
         const part3 = longBase[i+2]
         if(part1 && part2 && part3){
           //select and wrap word
           // join phrases on new line
           //  
         }
       }
       
     }     
     return [template];
/*
params
"textField": "Example one - replace *this* with\nexample two - repplace *that* with"
*/                  
    
  }
  getSupportedLibrary(): string {
    return "H5P.DragText"; //@todo 
  }
}

