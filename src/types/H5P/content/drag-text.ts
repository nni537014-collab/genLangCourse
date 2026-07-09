export interface DragTextContent {
    media:                Media;
    taskDescription:      string;
    overallFeedback:      OverallFeedback[];
    checkAnswer:          string;
    submitAnswer:         string;
    tryAgain:             string;
    showSolution:         string;
    dropZoneIndex:        string;
    empty:                string;
    contains:             string;
    ariaDraggableIndex:   string;
    tipLabel:             string;
    correctText:          string;
    incorrectText:        string;
    resetDropTitle:       string;
    resetDropDescription: string;
    grabbed:              string;
    cancelledDragging:    string;
    correctAnswer:        string;
    feedbackHeader:       string;
    behaviour:            Behaviour;
    scoreBarLabel:        string;
    a11yCheck:            string;
    a11yShowSolution:     string;
    a11yRetry:            string;
    textField:            string;
    distractors:          string;
}

export interface Behaviour {
    enableRetry:           boolean;
    enableSolutionsButton: boolean;
    enableCheckButton:     boolean;
    instantFeedback:       boolean;
}

export interface Media {
    disableImageZooming: boolean;
}

export interface OverallFeedback {
    from: number;
    to:   number;
}
