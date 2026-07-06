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
export interface BlanksContent {
    media: Media;
    text: string;
    overallFeedback: OverallFeedback[];
    showSolutions: string;
    tryAgain: string;
    checkAnswer: string;
    submitAnswer: string;
    notFilledOut: string;
    answerIsCorrect: string;
    answerIsWrong: string;
    answeredCorrectly: string;
    answeredIncorrectly: string;
    solutionLabel: string;
    inputLabel: string;
    inputHasTipLabel: string;
    tipLabel: string;
    behaviour: BehaviourConfig;
    scoreBarLabel: string;
    a11yCheck: string;
    a11yShowSolution: string;
    a11yRetry: string;
    a11yCheckingModeHeader: string;
    confirmCheck: Confirm;
    confirmRetry: Confirm;
    questions: string[];
}

export interface BehaviourConfig {
    enableRetry: boolean;
    allowRetryIfCorrect: boolean;
    enableSolutionsButton: boolean;
    enableCheckButton: boolean;
    autoCheck: boolean;
    caseSensitive: boolean;
    showSolutionsRequiresInput: boolean;
    separateLines: boolean;
    confirmCheckDialog: boolean;
    confirmRetryDialog: boolean;
    acceptSpellingErrors: boolean;
}

export interface Confirm {
    header: string;
    body: string;
    cancelLabel: string;
    confirmLabel: string;
}

export interface Media {
    disableImageZooming: boolean;
}

export interface OverallFeedback {
    from: number;
    to: number;
}

///////////////////////


//////////////////////////////

