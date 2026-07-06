/////////////////////////////////
export interface SingleChoiceSetContent {
    choices: Choice[];
    overallFeedback: OverallFeedback[];
    behaviour: Behaviour;
    l10n: L10N;
}

export interface Behaviour {
    autoContinue: boolean;
    timeoutCorrect: number;
    timeoutWrong: number;
    soundEffectsEnabled: boolean;
    enableRetry: boolean;
    enableSolutionsButton: boolean;
    passPercentage: number;
}

export interface Choice {
    subContentId: string;
    question: string;
    answers: string[];
}

export interface L10N {
    nextButtonLabel: string;
    nextButton: string;
    showResultsButtonLabel: string;
    retryButtonLabel: string;
    solutionViewTitle: string;
    correctText: string;
    incorrectText: string;
    shouldSelect: string;
    shouldNotSelect: string;
    muteButtonLabel: string;
    closeButtonLabel: string;
    slideOfTotal: string;
    scoreBarLabel: string;
    solutionListQuestionNumber: string;
    a11yShowSolution: string;
    a11yRetry: string;
    resultHeader: string;
    totalScore: string;
    resultTableHeader: string;
    resultScoreTableHeader: string;
    correctAnswerIntroduction: string;
}

export interface OverallFeedback {
    from: number;
    to: number;
}