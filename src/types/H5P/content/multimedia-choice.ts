export interface MultimediaChoiceContent {
    media:           MultimediaChoiceContentMedia;
    options:         Option[];
    overallFeedback: OverallFeedback[];
    behaviour:       Behaviour;
    l10n:            L10N;
    question:        string;
}

export interface Behaviour {
    enableRetry:                boolean;
    enableSolutionsButton:      boolean;
    confirmCheckDialog:         boolean;
    confirmRetryDialog:         boolean;
    singlePoint:                boolean;
    showSolutionsRequiresInput: boolean;
    questionType:               string;
    aspectRatio:                string;
    maxAlternativesPerRow:      string;
    passPercentage:             number;
}

export interface L10N {
    checkAnswerButtonText:  string;
    submitAnswerButtonText: string;
    checkAnswer:            string;
    showSolutionButtonText: string;
    showSolution:           string;
    correctAnswer:          string;
    wrongAnswer:            string;
    shouldCheck:            string;
    shouldNotCheck:         string;
    noAnswer:               string;
    retryText:              string;
    retry:                  string;
    result:                 string;
    missingAltText:         string;
    closeModalText:         string;
    confirmCheck:           Confirm;
    confirmRetry:           Confirm;
}

export interface Confirm {
    header:       string;
    body:         string;
    cancelLabel:  string;
    confirmLabel: string;
}

export interface MultimediaChoiceContentMedia {
    disableImageZooming: boolean;
}

export interface Option {
    media:   OptionMedia;
    correct: boolean;
    poster:  Poster;
}

export interface OptionMedia {
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

export interface Poster {
    path:      string;
    mime:      string;
    copyright: Copyright;
    width:     number;
    height:    number;
}

export interface OverallFeedback {
    from: number;
    to:   number;
}
