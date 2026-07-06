export interface QuestionSetContent {
    introPage: IntroPage;
    progressType: string;
    passPercentage: number;
    questions: Question[];
    disableBackwardsNavigation: boolean;
    randomQuestions: boolean;
    endGame: EndGame;
    override: Override;
    texts: Texts;
}

export interface EndGame {
    showResultPage: boolean;
    showSolutionButton: boolean;
    showRetryButton: boolean;
    noResultMessage: string;
    message: string;
    amountCorrect: string;
    scoreBarLabel: string;
    scoreHeader: string;
    overallFeedback: OverallFeedback[];
    solutionButtonText: string;
    retryButtonText: string;
    finishButtonText: string;
    submitButtonText: string;
    showAnimations: boolean;
    skippable: boolean;
    skipButtonText: string;
}

export interface OverallFeedback {
    from: number;
    to: number;
}

export interface IntroPage {
    showIntroPage: boolean;
    startButtonText: string;
    introduction: string;
}

export interface Override {
    checkButton: boolean;
}

export interface Question {
    params: Params;
    library: string;
    metadata: Metadata;
    subContentId: string;
}

export interface Metadata {
    contentType: string;
    license: string;
    title: string;
}

export interface Params {
    media: Media;
    answers: Answer[];
    overallFeedback: OverallFeedback[];
    behaviour: Behaviour;
    UI: UI;
    confirmCheck: Confirm;
    confirmRetry: Confirm;
    question: string;
}

export interface UI {
    checkAnswerButton: string;
    submitAnswerButton: string;
    showSolutionButton: string;
    tryAgainButton: string;
    tipsLabel: string;
    scoreBarLabel: string;
    tipAvailable: string;
    feedbackAvailable: string;
    readFeedback: string;
    wrongAnswer: string;
    correctAnswer: string;
    shouldCheck: string;
    shouldNotCheck: string;
    noInput: string;
    a11yCheck: string;
    a11yShowSolution: string;
    a11yRetry: string;
}

export interface Answer {
    correct: boolean;
    tipsAndFeedback: TipsAndFeedback;
    text: string;
}

export interface TipsAndFeedback {
    tip: string;
    chosenFeedback: string;
    notChosenFeedback: string;
}

export interface Behaviour {
    enableRetry: boolean;
    enableSolutionsButton: boolean;
    enableCheckButton: boolean;
    type: string;
    singlePoint: boolean;
    randomAnswers: boolean;
    showSolutionsRequiresInput: boolean;
    confirmCheckDialog: boolean;
    confirmRetryDialog: boolean;
    autoCheck: boolean;
    passPercentage: number;
    showScorePoints: boolean;
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

export interface Texts {
    prevButton: string;
    previous: string;
    nextButton: string;
    next: string;
    finishButton: string;
    submitButton: string;
    textualProgress: string;
    jumpToQuestion: string;
    questionLabel: string;
    readSpeakerProgress: string;
    unansweredText: string;
    answeredText: string;
    currentQuestionText: string;
    navigationLabel: string;
    questionSetInstruction: string;
}
