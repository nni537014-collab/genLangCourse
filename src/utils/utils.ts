//@todo move paths to separate file
// import { ZipArchive } from "archiver"

import {

    //createReadStream,
    //mkdirSync,
    rmSync,
    readFileSync,
    // writeFileSync,
    // createWriteStream,
    // copyFileSync,
    // renameSync,
    // type PathLike
} from "fs"
import path from "path"
import {
    // outDirName,
    assetsDirName,
    // pairsFileName,
    // dictionaryPath,
    h5pAssetsDirName,
    h5pJsonFileName,
    h5pContentDir,
    h5pContentFileName,
    // h5pAudioDirName,
    // writeDirName
} from "../config.ts"

import { fileURLToPath } from "url";
// import { createHash } from "crypto";
// import type {
//     JsonValue,
//     ContentGenerator,
//     LibraryNames,
//     ArchivedPaths,
//     WrittenH5PArchive
// } from "../types/types.ts";
import { paths } from "./paths.ts";
import type { LibraryNames } from "../types/types.ts";
import { schemaRegistry, type InferTemplateType } from "../types/H5P/schema-registry.ts";
import type zod from "zod";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const utilsToBase = "../../";



/**
currently classes use lib name eg "H5P.Blanks"
json files join a version on a space
this func returnsi just a name 
*/

export function stripVersionFromLibraryName(input: string) {
    const name = input.trim().split(" ")[0];
    if (!name || name.length < 1) throw new Error("bad input");
    return name;
}
export function generatorTemplateFinder(supportedLibrary: LibraryNames) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const utilsToBase = "../../";
    const libraryName = stripVersionFromLibraryName(supportedLibrary);
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
export function getValidatedContentTemplate<T extends LibraryNames>(library: T, rawData: unknown): InferTemplateType<T> {
    const schema = schemaRegistry[library] as unknown as zod.ZodType<InferTemplateType<T>>;

    // Type guard: ensure rawData is an object that contains a 'content' property
    if (rawData && typeof rawData === 'object' && 'content' in rawData) {
        return schema.parse((rawData as { content: unknown }).content);
    }

    throw new Error("Invalid rawData structure: missing 'content' property.");   
    // return schema.parse(rawData.content);
}
export const clearPreviousGeneratedData = () => {
    return rmSync(paths.getOut(), { recursive: true, force: true })
}
export const genRandomNumbers = (
    count: number,
    lowerLimit: number,
    upperLimit: number,
    skip: number[]) => {
    if (upperLimit - lowerLimit - skip.length < count) throw new Error("not possible to generate solutions");
    if (upperLimit < 0 || lowerLimit < 0) throw new Error("positive limits required");
    const generated: number[] = [];
    const repLimit = 10000;
    let repCount = 0;
    while (generated.length < count) {
        const candidate = Math.random() * (upperLimit - lowerLimit) + lowerLimit;
        if (!skip.includes(candidate)
            && !generated.includes(candidate)
        ) {
            generated.push(candidate);
        }
        if (++repCount > repLimit) {
            throw new Error(`rep limit exceed, bad luck? 
                upperLimit: ${upperLimit} lowerLimit: ${lowerLimit}
                count: ${count} skip length: ${skip.length}`)
        }

    }
    return generated;
}
