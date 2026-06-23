import type {
  TranslationPair,
  JsonValue,
  contentGenerator,
  subContentGenerator
} from "./../../types/types.ts";

export class SingleChoiceSetGenerator implements subContentGenerator{
  answerCount = 4;
  generate(base: TranslationPair[]): JsonValue {
      return base.map(this.generateSingleChoice)
      return true;
  }
  generateSingleChoice(translationPair: TranslationPair, i: number, base: TranslationPair[]){
      return {
        subContentId: this.subContentIdCreate(),
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
               if(useable.length >= this.answerCount - 1) enoughWrongAns = true;
          }
        
      }
      ret.push(translationPair.translation); // frst ans corrct
      useable.forEach(wrongIndex => (base[wrongIndex]) ? ret.push(base[wrongIndex].translation) : null);
      return ret;
  }
  subContentIdCreate(){
    return ""; //@todo
  }
  getActionLibrary(): string {
      return "H5P.SingleChoiceSet 1.11";
  }
}
