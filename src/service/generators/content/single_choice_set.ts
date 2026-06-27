import type {
  TranslationPair,
  JsonValue,
  ContentGenerator as ContentGenerator,
 
} from "../../../types/types.ts";
import { randomUUID } from "crypto";


export class SingleChoiceSetGenerator implements ContentGenerator{
  answerCount = 4;
  generate(base: TranslationPair[], template: JsonValue): JsonValue {

      (template as any).choices = base.map(this.generateSingleChoice);
      return template;

  }
  generateSingleChoice(translationPair: TranslationPair, i: number, base: TranslationPair[]){
      return {
        subContentId: randomUUID(),
        question: translationPair.source,
        answers: this.generateAnswer(translationPair, i, base)
      }
  }
  generateAnswer(translationPair: TranslationPair, i: number, base: TranslationPair[]){
      const ret: string[] = [];
      const useable: number[] = []
      let enoughWrongAns = false;
      while(!enoughWrongAns){
          const maybeUseable = Math.random() * base.length
          if(maybeUseable !== i && base[i]){
               useable.push(i);
               // > shouldn't be needed but leaving anyway
               if(useable.length >= this.answerCount - 1)
                enoughWrongAns = true;
          }
        
      }
      ret.push(translationPair.translation); // frst ans corrct
      useable.forEach(wrongIndex => (base[wrongIndex]) ? ret.push(base[wrongIndex].translation) : null);
      return ret;
  }

  getSupportedLibrary(): string {
      return "H5P.SingleChoiceSet";
  }
}
