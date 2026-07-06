export interface H5PJSON {
    title: string;
    language: string;
    mainLibrary: string;
    embedTypes: string[];
    license: string;
    defaultLanguage: string;
    preloadedDependencies: PreloadedDependency[];
}

export interface PreloadedDependency {
    machineName: string;
    majorVersion: string;
    minorVersion: string;
}
//////////////////////////////////////////

///////////////////////


//////////////////////////////

