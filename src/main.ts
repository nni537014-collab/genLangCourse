import { clearPreviousGeneratedData } from "./service/utils.ts"
import { Dictionary } from "./service/dictionary.ts"
class CourseCreator {
    constructor(){

    }
    prepareBaseDataFromAssets(){

    }
    extendBaseData(){

    }

}

class DataExtenderImage{
  constructor(){

  }
}

class DataExtenderAudio{
  constructor(){

  }
}


clearPreviousGeneratedData();
 const dictionary = await Dictionary.create("es");
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
const details = await dictionary.loadWordDetailFromDisk("casa");
console.log(details.length);
details.map((entry)=>{
  if(entry.senses){
    entry.senses.map((sense)=>{
      console.log(sense);
    })
  }
})