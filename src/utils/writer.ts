//@todo move paths to separate file
import { ZipArchive } from "archiver"
import {
    createReadStream,
    mkdirSync,
    writeFileSync,
    createWriteStream,
    renameSync,
    existsSync,
} from "fs"
import path from "path"
import type {
    ContentGenerator,
    LibraryNames,
    ArchivedPaths,
    GeneratorAudioSet,
} from "../types/types.ts";
import { paths } from "./paths.ts";
import { generatorAudioToPath } from "./paths/audio.ts";
import { stripVersionFromLibraryName } from "./utils.ts";
import type { H5PContent } from "../types/H5P/content/content.ts";
import type { H5PJSON } from "../types/H5P/h5p.ts";

export async function h5pWrite(
    content: H5PContent,
    audio: GeneratorAudioSet,
    h5p: H5PJSON,
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
    //@TODO copy all files from audio folder to content folder
    if (audio) {
        audio.forEach((ga) => {
            const audioFileFromPath = generatorAudioToPath(ga, "absolute");
            const audioFileRelToPath = generatorAudioToPath(ga, "h5p");
            const audioFileToPath = path.join(contentFolderPath, audioFileRelToPath) as typeof audioFileRelToPath;
            const targetDir = path.dirname(audioFileToPath);

            // 2. Create the directory if it does not exist
            if (!existsSync(targetDir)) {
                mkdirSync(targetDir, { recursive: true });
            }
            createReadStream(audioFileFromPath).pipe(createWriteStream(audioFileToPath));
        });
    }
    await archiveContent(writePath, writtenPaths);
    //@todo fix all this for proper error handling and async
    return writtenPaths;
}
// export function h5pFolderToArchive(folderPath: string, index: number, libraryName: LibraryNames) {
//     //@todo
//     const h5pArchivePath = path.join(folderPath);
// }

// const archiveContent = (dir: string, archivedPaths: ArchivedPaths) => {
//     // create a file to stream archive data to.
//     //@todo path.join to replace path concat below
//     const zipPath = `${dir}.zip`;
//     const h5pPath = `${dir}.h5p`;
//     const output = createWriteStream(zipPath);
//     const archive = new ZipArchive({
//         zlib: { level: 9 }, // Sets the compression level.
//     });

//     output.on("close", function () {
//         console.log(archive.pointer() + " total bytes");
//         console.log(
//             "archiver has been finalized and the output file descriptor has closed.",
//         );
//         renameSync(zipPath, h5pPath);
//         archivedPaths.add(h5pPath);
//         console.log("renamed ZIP to H5P:", h5pPath);
//     });

//     output.on("end", function () {
//         console.log("Data has been drained");
//     });

//     archive.on("warning", function (err) {
//         if (err.code === "ENOENT") {
//             // log warning
//         } else {
//             // throw error
//             throw err;
//         }
//     });
//     archive.on("error", function (err) {
//         throw err;
//     });
//     archive.pipe(output);
//     // append a file from stream

//     //@todo check this doesn't cause h5p import to fail
//     archive.directory(dir, false);
//     // finalize the archive (ie we are done appending files but streams have to finish yet)
//     // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
//     archive.finalize();
// }

// import { createWriteStream, renameSync } from "fs";
// import path from "path"; // Added for the path.join @todo

const archiveContent = (dir: string, archivedPaths: ArchivedPaths): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Resolved @todo: Used path.join instead of string concatenation
        const zipPath = path.join(path.dirname(dir), `${path.basename(dir)}.zip`);
        const h5pPath = path.join(path.dirname(dir), `${path.basename(dir)}.h5p`);
        
        const output = createWriteStream(zipPath);
        const archive = new ZipArchive({
            zlib: { level: 9 }, 
        });

        // Resolve the promise when the file descriptor is fully closed
        output.on("close", function () {
            try {
                console.log(archive.pointer() + " total bytes");
                console.log("archiver has been finalized and the output file descriptor has closed.");
                
                renameSync(zipPath, h5pPath);
                archivedPaths.add(h5pPath);
                console.log("renamed ZIP to H5P:", h5pPath);
                
                resolve(); // Promise finishes successfully
            } catch (renameError) {
                reject(renameError); // Catch filesystem errors during rename
            }
        });

        output.on("end", function () {
            console.log("Data has been drained");
        });

        archive.on("warning", function (err) {
            if (err.code === "ENOENT") {
                console.warn("Archiver warning:", err);
            } else {
                reject(err); // Reject promise on critical warning
            }
        });

        archive.on("error", function (err) {
            reject(err); // Reject promise on archive error
        });

        output.on("error", function (err) {
            reject(err); // Reject promise on stream write error
        });

        archive.pipe(output);
        archive.directory(dir, false);
        archive.finalize();
    });
};

// export function generatorWriterFinder(generator: ContentGenerator) {
//     const libraryName = stripVersionFromLibraryName(generator.getSupportedLibrary());
//     //@todo    
// }