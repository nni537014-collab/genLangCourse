//@todo move paths to separate file
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
    ArchivedPaths,
    WrittenH5PArchive
} from "../types/types.ts";
import { paths } from "./paths.ts";
import { stripVersionFromLibraryName } from "./utils.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const utilsToBase = "../../";
export function h5pWrite(
    content: JsonValue,
    h5p: JsonValue,
    index: number,
    libraryName: LibraryNames,
    writtenPaths: ArchivedPaths
) {
    const writeAllPath = path.join(paths.getWrite(), libraryName);
    const writePath = path.join(writeAllPath, `${libraryName}${index}`);
    const h5pFilePath = path.join(writePath, "h5p.json");
    const contentFolderPath = path.join(writePath, "content");
    const contentFilePath = path.join(contentFolderPath, "content.json");
    mkdirSync(contentFolderPath, { recursive: true });
    writeFileSync(h5pFilePath, JSON.stringify(h5p));
    writeFileSync(contentFilePath, JSON.stringify(content));
    h5pFolderToArchive(writePath, index, libraryName);
    //@todo fix all this for proper error handling and async
    return writtenPaths.add(writePath + ".h5p")
}
export function h5pFolderToArchive(folderPath: string, index: number, libraryName: LibraryNames) {
    //@todo
    const h5pArchivePath = path.join(folderPath);
}

const archiveContent = (dir: string, archivedPaths: ArchivedPaths) => {
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


export function generatorWriterFinder(generator: ContentGenerator) {
    const libraryName = stripVersionFromLibraryName(generator.getSupportedLibrary());
    //@todo    
}