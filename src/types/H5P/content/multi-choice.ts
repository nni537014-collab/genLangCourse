export interface MultiChoiceContent {
    media:           Media;
    answers:         Answer[];
    overallFeedback: OverallFeedback[];
    behaviour:       Behaviour;
    UI:              UI;
    confirmCheck:    Confirm;
    confirmRetry:    Confirm;
    question:        string;
}

export interface UI {
    checkAnswerButton:  string;
    submitAnswerButton: string;
    showSolutionButton: string;
    tryAgainButton:     string;
    tipsLabel:          string;
    scoreBarLabel:      string;
    tipAvailable:       string;
    feedbackAvailable:  string;
    readFeedback:       string;
    wrongAnswer:        string;
    correctAnswer:      string;
    shouldCheck:        string;
    shouldNotCheck:     string;
    noInput:            string;
    a11yCheck:          string;
    a11yShowSolution:   string;
    a11yRetry:          string;
}

export interface Answer {
    correct:         boolean;
    tipsAndFeedback: TipsAndFeedback;
    text:            string;
}

export interface TipsAndFeedback {
    tip:               string;
    chosenFeedback:    string;
    notChosenFeedback: string;
}

export interface Behaviour {
    enableRetry:                boolean;
    enableSolutionsButton:      boolean;
    enableCheckButton:          boolean;
    type:                       string;
    singlePoint:                boolean;
    randomAnswers:              boolean;
    showSolutionsRequiresInput: boolean;
    confirmCheckDialog:         boolean;
    confirmRetryDialog:         boolean;
    autoCheck:                  boolean;
    passPercentage:             number;
    showScorePoints:            boolean;
}

export interface Confirm {
    header:       string;
    body:         string;
    cancelLabel:  string;
    confirmLabel: string;
}

export interface Media {
    disableImageZooming: boolean;
}

export interface OverallFeedback {
    from: number;
    to:   number;
}
