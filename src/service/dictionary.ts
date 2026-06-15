import { createReadStream } from "fs";
import { getAssetDictionaryPath } from "./utils.ts"
import readline from "readline";
class Dictionary {
    uniqueWordsInCards: Set<string>;
    constructor() {
        this.uniqueWordsInCards = new Set<string>;

        const rl = readline.createInterface({
            input: createReadStream(getAssetDictionaryPath()),
            crlfDelay: Infinity
        });
        rl.on("line", this.processLine);

        rl.on("close", this.processClose);
        // this._data =   
    }
    processLine(line: string) {
        //remove empty lines
        if (!line.trim()) return;

        try {
            const obj = JSON.parse(line);
            console.log(obj); process.exit();
            if (this.uniqueWordsInCards.has(obj.word)) {
                //adding all jsonl info of words that 
                // intersect sets to array
                // jsonlWordsInCards.push(obj);
            } else {

            }

        //     // duplicates + uniqueWordsInJSONL should equal entriesInJsonl
        //     if (uniqueWordsInJSONL.has(obj.word)) ++duplicatedWordsInJSONL;
        //     uniqueWordsInJSONL.add(obj.word);
        //     ++entriesInJsonl;

        //     let matched = false;
        //     wordTypeCounts.forEach(wordPosCount => {
        //         if (wordPosCount.wordType === obj.pos) {
        //             wordPosCount.count++;
        //             matched = true;
        //         }
        //     })
        //     if (!matched && obj.pos) {
        //         wordTypeCounts.push({
        //             wordType: obj.pos,
        //             count: 1
        //         })
        //     }
        //     let en = [];
        //     if (obj.translations && Array.isArray(obj.translations)) {
        //         en = obj.translations.filter((val: any) => (val.lang_code === "en"))
        //     }
        //     if (en.length === 0) return;

        //     // if (dictionaryEsEn.includes(obj.word)) return;
        //     dictionaryEsEn.push({
        //         word: obj.word,
        //         translation: en,
        //     });


         } catch (err) {
             console.error("Bad JSON:", err);
         }
    }
    processClose() {

    }
}

new Dictionary();