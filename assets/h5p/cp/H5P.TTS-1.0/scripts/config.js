// export const cssSelectorDialog = '.h5p-dialogcards-card-text-area';
// export const cssSelectorQuiz = ".h5p-question-main-content";
// export const cssAudioButtonInline = "audio-button-inline";
// export const cssAudioButtonQuestion = "audio-button-question";
// export const cssAudioButtonDetail = "audio-button-detail";
export const css = {
    selector: {
        dialog: '.h5p-dialogcards-card-text-area',
        quiz: ".h5p-question-main-content",
    },
    classes: {
        audioButtonInline: "audio-button-inline",
        audioButtonQuestion: "audio-button-question",
        audioButtonDetail: "audio-button-detail",
        //@todo move to monorepo dep - used in multiple projects
        listeningQuestion: "listening-question",
    },

};
export const dataLangSelector = 'lang';
export const speakButtonText = '🔊';
export const baseLang = 'en-US';
//@todo monorepo for config that is shared such as css selectors
export const cssQuizListeningQuestion = ".listening-question"
export const h5pContentTypeNames = {
    base: {
        h5pDialogName: 'H5P.Dialogcards',
        h5pQuestionSetName: 'H5P.QuestionSet',
        h5pBlanksName: 'H5P.Blanks'
    },
    listening: {
        h5pListening: "H5P.QuestionSetListening"
    },

}
export const eventNames = {
    resize: 'resize',
    domChanged: 'domChangedEvent',
    initialized: 'initialized',
    wildcard: '*'
}