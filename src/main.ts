import { clearPreviousGeneratedData } from "./service/utils.ts"
import { Dictionary } from "./service/dictionary.ts"
import { PairsWordExpander } from "./service/pairsWordExpander.ts"
import { Pairs } from "./service/pairs.ts"
class CourseCreator {
  constructor() {

  }
  prepareBaseDataFromAssets() {

  }
  extendBaseData() {

  }

}

class DataExtenderImage {
  constructor() {

  }
}

class DataExtenderAudio {
  constructor() {

  }
}


clearPreviousGeneratedData();
// const dictionary = await Dictionary.create("es");
const expander = await PairsWordExpander.create("es");
const pairs = new Pairs(expander);
console.log(pairs.getPairs());
console.log("pairs length:", pairs.getPairs().length)
//  dictionary.findByWord("casa").map((entry)=>{
//   if(entry.pos === "verb"){
//     console.log(entry);
//   }
//  });
//  const res = dictionary.findExactTranslations("casa", "en");
//  res.map((entry)=>{
//    entry.translations?.map((tr)=>{
//     console.log(tr);
//    })
//  })

// console.log(details.length);
// details.map((entry) => {
//   if (entry.pos !== "verb") return;
//   const [hasFormOf, formFound] = dictionary.hasFormOf(entry);
//   console.log("has form-of", hasFormOf, formFound);
//   console.log(entry)
//   if (entry.senses) {
//     entry.senses.map((sense) => {
//       console.log(sense);
//     })
//   }
// })



// const pwe = await PairsWordExpander.create("es");
// pwe.getTranslatedWords(["hola", "amigo"]).map((entry) => {
//     entry.translations?.map((trans) => {
//         console.log(trans);
//     })
// })