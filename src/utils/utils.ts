import { ZipArchive } from "archiver"

import {
    
    createReadStream,
    mkdirSync,
    rmSync,
    readFileSync,
    writeFileSync,
    createWriteStream,
    copyFileSync,
    renameSync,
    type PathLike
} from "fs"
import path from "path"
import {
    outDirName,
    assetsDirName,
    pairsFileName,
    dictionaryPath,
    h5pAssetsDirName,
    h5pJsonFileName,
    h5pContentDir,
    h5pContentFileName,
    h5pAudioDirName,
    writeDirName
} from "../config.ts"

import { fileURLToPath } from "url";
import { createHash } from "crypto";
import type {
    JsonValue,
    ContentGenerator,
    LibraryNames,
    archivedPaths,
    writtenH5PArchive
} from "../types/types.ts";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const utilsToBase = "../../";
export function h5pWrite(
    content: JsonValue,
    h5p: JsonValue,
    index: number,
    libraryName: LibraryNames,
    writtenPaths: archivedPaths
){
    const writeAllPath = path.join(getWritePath(), libraryName); 
    const writePath = path.join(writeAllPath, `${ libraryName }${ index }`);
    const h5pFilePath = path.join(writePath, "h5p.json");
    const contentFolderPath = path.join(writePath, "content");
    const contentFilePath = path.join(contentFolderPath, "content.json"); 
    mkdirSync(contentFolderPath, { recursive: true});
    writeFileSync(h5pFilePath, JSON.stringify(h5p));
    writeFileSync(contentFilePath, JSON.stringify(content));   
    h5pFolderToArchive(writePath, index, libraryName);
//@todo fix all this for proper error handling and async
    return writtenPaths.add(writePath + ".h5p")
}
export function h5pFolderToArchive(folderPath: string, index: number, libraryName: LibraryNames){
    //@todo
    const h5pArchivePath = path.join(folderPath);
}

    const archiveContent = (dir: string, archivedPaths: archivedPaths) => {
     // create a file to stream archive data to.
     //@todo path.join to replace path concat below
     const zipPath = `${dir}.zip`;
      const h5pPath = `${dir}.h5p`;
     const h5pJsonFilename = `${dir}/h5p.json`;
      const contentJsonFilename = `${dir}/content/content.json`;
      const output = createWriteStream(zipPath);
    const archive = new ZipArchive({
       zlib: { level: 9 }, // Sets the compression level.
     });
  
      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
    output.on("close", function () {
       console.log(archive.pointer() + " total bytes");
        console.log(
          "archiver has been finalized and the output file descriptor has closed.",
      );
        renameSync(zipPath, h5pPath);
        console.log("renamed ZIP to H5P:", h5pPath);
      });
  
     // This event is fired when the data source is drained no matter what was the data source.
     // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
     output.on("end", function () {
       console.log("Data has been drained");
      });
  
     // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on("warning", function (err) {
       if (err.code === "ENOENT") {
          // log warning
       } else {
         // throw error
         throw err;
       }
      });
    // good practice to catch this error explicitly
    archive.on("error", function (err) {
      throw err;
   });
    // pipe archive data to the file
    archive.pipe(output);
   // append a file from stream

    archive.append(createReadStream(h5pJsonFilename), { name: "h5p.json" });
     // append a file from string
     archive.append(createReadStream(contentJsonFilename), { name: "content/content.json" });
 
    // finalize the archive (ie we are done appending files but streams have to finish yet)
     // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
     archive.finalize();
  }


export function generatorWriterFinder(generator: ContentGenerator){
    const libraryName = getLibraryName(generator.getSupportedLibrary());
    //@todo    
}
function getLibraryName(input: string){
    const name = input.trim().split(" ")[0];
    if(!name || name.length < 1) throw new Error("bad input");
    return name;
}
export function generatorTemplateFinder(supportedLibrary: string) {
    const libraryName = getLibraryName(supportedLibrary);
    const templPath = path.join(
        __dirname,
        utilsToBase,
        assetsDirName,
        h5pAssetsDirName,
        libraryName
    );
    const h5pJsonPath = path.join(
        templPath,
        h5pJsonFileName
    );
    const contentJsonPath = path.join(
        templPath,
        h5pContentDir,
        h5pContentFileName
    );
    const h5pJson = readFileSync(h5pJsonPath, "utf8");
    const h5pContent = readFileSync(contentJsonPath, "utf8");
    return {
        h5p: JSON.parse(h5pJson),
        content: JSON.parse(h5pContent)
    };
    // check required files can load
    // return tuple - [h5pJson, contentJson]

}
export function md5Filename(input: string): string {
    return createHash("md5").update(input).digest("hex");
}
export function audioFileName(input: string) {
    return `${md5Filename(input)}.mp3`
}
export function getAudioPath(input: string) {
    return path.join(
        audioDir(),
        audioFileName(input)
    )

}
export function getAudioH5pRelativePath(input: string) {
    return path.join(
        "audio",
        audioFileName(input)
    )
}
export function audioDir() {
    return path.join(
        __dirname,
        utilsToBase,
        assetsDirName,
        h5pAudioDirName
    )
}
export const clearPreviousGeneratedData = () => {
    return rmSync(getOutPath(), { recursive: true, force: true })
}

export const getAssetPairsPath = () => {
    return path.join(getAssetsPath(), pairsFileName);
}

const getOutPath = () => {
    return path.join(getBasePath(), outDirName)
}
export const getWritePath = () => {
    return path.join(getOutPath(), writeDirName);
}
const getAssetsPath = () => {
    return path.join(getBasePath(), assetsDirName)
}
export const getAssetDictionaryPath = () => {
    return path.join(getAssetsPath(), dictionaryPath);
}
const getBasePath = () => {
    return path.resolve(__dirname, "../../");
}
export const genRandomNumbers = (
    count: number,
    lowerLimit: number,
    upperLimit: number,
    skip: number[]) => {
    if(upperLimit - lowerLimit - skip.length < count) throw new Error("not possible to generate solutions");
    if(upperLimit < 0 || lowerLimit < 0) throw new Error("positive limits required");
    const generated: number[] = [];
    let repLimit = 10000; 
    let repCount = 0;
    while (generated.length < count) {
        const candidate = Math.random() * (upperLimit - lowerLimit) + lowerLimit;
        if (!skip.includes(candidate)
            && !generated.includes(candidate)
        ) {
           generated.push(candidate);
        }
        if( ++repCount > repLimit){
            throw new Error(`rep limit exceed, bad luck? 
                upperLimit: ${ upperLimit } lowerLimit: ${ lowerLimit }
                count: ${ count } skip length: ${skip.length}`)
        }

    }
    return generated;
}
