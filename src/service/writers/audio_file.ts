import type { TranslationPair } from "./../../types/types.ts"
import { paths, md5Filename } from "../../utils/utils.ts"
import fs from "fs"
import say from "say";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { resolve } from "dns";
import { rejects } from "assert";

class AudioFileCreator {
//    state: "ready" | "busy" = "ready";
      convertToMP3 = false;
//    busyCount = 0;
    busy: Record<string, TranslationPair> = {};
    completed: TranslationPair[] = [];
    voice = "Microsoft Hazel Desktop"
    _base: TranslationPair[];
    _flatBase: Record<string, string> = {}
    constructor(base: TranslationPair[], asMP3: boolean) {
        this.convertToMP3 = asMP3;
        this._base = base;
    }
    flattenBase(){
        this._base.forEach(tp => {
            this._flatBase[this.busyKey("source", tp.source)] = tp.source;
            this._flatBase[this.busyKey("translation", tp.translation)] = tp.translation; 
        })
    }
    produceAllFiles() {
        
//        this._base.forEach(this.produceFile)
        this.flattenBase();
        const created: Promise<string>[] = [];
        for(const [ p, s ] of Object.entries(this._flatBase)){
            created.push(this.createAudioFile(s, p))
        }
         const set = Promise.allSettled(created);
         
    }
    produceFile(tp: TranslationPair) {
        
        const translationAudioPath = paths.getAudio(tp.translation); 
        const sourceAudioPath = paths.getAudio(tp.source); 

        if (!fs.existsSync(translationAudioPath) || fs.existsSync(sourceAudioPath)) {
            //gen
            this.busy[this.busyKey("source", tp.source)] = tp;
            this.busy[this.busyKey("translation", tp.translation)] = tp;
  //          this.state = "busy";
  //             
        }
    }
    createAudioFile(text: string, filePath: string) {
        const wavFile = `${ fileURLToPath }.wav`
        return new Promise<string>((resolve, reject) => {
        say.export(text, this.voice, 1, wavFile, (err) => {
            if (err) reject(err);
            execSync(`ffmpeg -y -i ${wavFile} ${filePath}`);
            resolve(filePath);
       //     delete this.busy[this.busyKey(type, text)];
            if(Object.keys(this.busy).length === 0){
    //             this.state = "ready";
          //       console.log("finished creating audio files")
                 if(this.convertToMP3){
             //        execSync(`ffmpeg -y -i ${wavFile} ${filePath}`);
                 }
            }
        });
            
        })
    }
    busyKey(type: "source" | "translation", input: string){
        return  `${type}${md5Filename(input)}`;
    }
}
