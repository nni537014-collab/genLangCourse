export interface DialogcardsContent {
    mode: string;
    dialogs: Dialog[];
    behaviour: Behaviour;
    answer: string;
    next: string;
    prev: string;
    retry: string;
    correctAnswer: string;
    incorrectAnswer: string;
    round: string;
    cardsLeft: string;
    nextRound: string;
    startOver: string;
    showSummary: string;
    summary: string;
    summaryCardsRight: string;
    summaryCardsWrong: string;
    summaryCardsNotShown: string;
    summaryOverallScore: string;
    summaryCardsCompleted: string;
    summaryCompletedRounds: string;
    summaryAllDone: string;
    progressText: string;
    cardFrontLabel: string;
    cardBackLabel: string;
    tipButtonLabel: string;
    audioNotSupported: string;
    confirmStartingOver: ConfirmStartingOver;
    title: string;
    description: string;
}

export interface Behaviour {
    enableRetry: boolean;
    disableBackwardsNavigation: boolean;
    scaleTextNotCard: boolean;
    randomCards: boolean;
    maxProficiency: number;
    quickProgression: boolean;
}

export interface ConfirmStartingOver {
    header: string;
    body: string;
    cancelLabel: string;
    confirmLabel: string;
}

export interface Dialog {
    text: string;
    answer: string;
    tips: Tips;
}

export interface Tips {
}