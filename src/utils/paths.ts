//@todo move paths to separate file
// import { ZipArchive } from "archiver";

// import {
//   createReadStream,
//   mkdirSync,
//   rmSync,
//   readFileSync,
//   writeFileSync,
//   createWriteStream,
//   copyFileSync,
//   renameSync,
//   type PathLike,
// } from "fs";
import path from "path";
import {
  outDirName,
  assetsDirName,
  pairsFileName,
  dictionaryPath,
  // h5pAssetsDirName,
  // h5pJsonFileName,
  // h5pContentDir,
  // h5pContentFileName,
  // h5pAudioDirName,
  writeDirName,
} from "../config.ts";

import { fileURLToPath } from "url";
// import { createHash } from "crypto";
// import type {
  // JsonValue,
  // ContentGenerator,
  // LibraryNames,
  // ArchivedPaths,
  // WrittenH5PArchive,
  // SourceOrTranslation,
  // AudioFileName,
  // GeneratorAudio,
// } from "../types/types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const utilsToBase = "../../";

///////////////////////////////////////////

///////////////////////////////
const getAssetPairsPath = () => {
  return path.join(getAssetsPath(), pairsFileName);
};

const getOutPath = () => {
  return path.join(getBasePath(), outDirName);
};
const getWritePath = () => {
  return path.join(getOutPath(), writeDirName);
};
const getAssetsPath = () => {
  return path.join(getBasePath(), assetsDirName);
};
const getAssetDictionaryPath = () => {
  return path.join(getAssetsPath(), dictionaryPath);
};
export const getBasePath = () => {
  return path.resolve(__dirname, utilsToBase);
};
export const paths = {
  getBase: getBasePath,
  getAssetDictionary: getAssetDictionaryPath,
  getWrite: getWritePath,
  getOut: getOutPath,
  getAssetPairs: getAssetPairsPath,
};
