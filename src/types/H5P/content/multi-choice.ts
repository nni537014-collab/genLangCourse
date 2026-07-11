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
    type:                Type;
}

export interface Type {
    params:       Params;
    library:      string;
    metadata:     Metadata;
    subContentId: string;
}

export interface Metadata {
    contentType: string;
    license:     string;
    title:       string;
}

export interface Params {
    playerMode:        string;
    fitToWrapper:      boolean;
    controls:          boolean;
    autoplay:          boolean;
    playAudio:         string;
    pauseAudio:        string;
    contentName:       string;
    audioNotSupported: string;
    files:             File[];
}

export interface File {
    path:      string;
    mime:      string;
    copyright: Copyright;
}

export interface Copyright {
    license: string;
}

export interface OverallFeedback {
    from: number;
    to:   number;
}
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
