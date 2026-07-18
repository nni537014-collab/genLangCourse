// // import type { LibraryNames } from "../../types.ts";
// import type { BlanksContent } from "./blanks.ts";
// import type { DialogcardsContent } from "./dialog-cards.ts";
// import type { DragTextContent } from "./drag-text.ts";
// import type { MultiChoiceContent } from "./multi-choice.ts";
// import type { MultimediaChoiceContent } from "./multimedia-choice.ts";
// import type { SingleChoiceSetContent } from "./single-choice-set.ts";

// export interface CoursePresentationContent {
//   presentation: Presentation;
//   override: Override;
//   l10n: { [key: string]: string };
// }

// export interface Override {
//   activeSurface: boolean;
//   hideSummarySlide: boolean;
//   summarySlideSolutionButton: boolean;
//   summarySlideRetryButton: boolean;
//   enablePrintButton: boolean;
//   social: Social;
// }

// export interface Social {
//   showFacebookShare: boolean;
//   facebookShare: FacebookShare;
//   showTwitterShare: boolean;
//   twitterShare: TwitterShare;
//   showGoogleShare: boolean;
//   googleShareUrl: string;
// }

// export interface FacebookShare {
//   url: string;
//   quote: string;
// }

// export interface TwitterShare {
//   statement: string;
//   url: string;
//   hashtags: string;
// }

// export interface Presentation {
//   slides: Slide[];
//   keywordListEnabled: boolean;
//   globalBackgroundSelector: GlobalBackgroundSelector;
//   keywordListAlwaysShow: boolean;
//   keywordListAutoHide: boolean;
//   keywordListOpacity: number;
// }

// export interface GlobalBackgroundSelector {}

// export interface Slide {
//   elements: Element[];
//   slideBackgroundSelector: GlobalBackgroundSelector;
// }

// export interface Element {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   action: Action;
//   alwaysDisplayComments: boolean;
//   backgroundOpacity: number;
//   displayAsButton: boolean;
//   buttonSize: string;
//   goToSlideType: string;
//   invisible: boolean;
//   solution: string;
// }

// export type Action = 
//     BlanksAction 
//     | DialogCardsAction 
//     | SingleChoiceSetAction 
//     | MultiChoiceAction 
//     | DragTextAction
//     | MultiMediaChoiceAction;

// interface BaseAction {
//   subContentId: string;
//   metadata: Metadata;
// }

// // 3. Create the individual action interfaces (The Discriminated Variants)
// interface BlanksAction extends BaseAction {
//   library: "H5P.Blanks";
//   params: BlanksContent; // Unique params for Blanks
// }

// interface DialogCardsAction extends BaseAction {
//   library: "H5P.Dialogcards";
//   params: DialogcardsContent; // Unique params for Blanks
// }

// interface SingleChoiceSetAction extends BaseAction {
//   library: "H5P.SingleChoiceSet";
//   params: SingleChoiceSetContent; // Unique params for Blanks
// }
// interface MultiChoiceAction extends BaseAction {
//   library: "H5P.MultiChoice";
//   params: MultiChoiceContent; // Unique params for Blanks
// }
// interface MultiMediaChoiceAction extends BaseAction {
//   library: "H5P.MultiMediaChoice";
//   params: MultimediaChoiceContent; // Unique params for Blanks
// }
// interface DragTextAction extends BaseAction {
//   library: "H5P.DragText";
//   params: DragTextContent; // Unique params for Blanks
// }
// export interface Metadata {
//   contentType: string;
//   license: License;
//   title: string;
// }

// export enum License {
//   U = "U",
// }

// export interface ActionParams {
//   mode?: string;
//   dialogs?: Dialog[];
//   behaviour: Behaviour;
//   answer?: string;
//   next?: string;
//   prev?: string;
//   retry?: string;
//   correctAnswer?: string;
//   incorrectAnswer?: string;
//   round?: string;
//   cardsLeft?: string;
//   nextRound?: string;
//   startOver?: string;
//   showSummary?: string;
//   summary?: string;
//   summaryCardsRight?: string;
//   summaryCardsWrong?: string;
//   summaryCardsNotShown?: string;
//   summaryOverallScore?: string;
//   summaryCardsCompleted?: string;
//   summaryCompletedRounds?: string;
//   summaryAllDone?: string;
//   progressText?: string;
//   cardFrontLabel?: string;
//   cardBackLabel?: string;
//   tipButtonLabel?: string;
//   audioNotSupported?: string;
//   confirmStartingOver?: Confirm;
//   title?: string;
//   description?: string;
//   choices?: Choice[];
//   overallFeedback?: OverallFeedback[];
//   l10n?: L10N;
//   media?: Media;
//   answers?: Answer[];
//   UI?: UI;
//   confirmCheck?: Confirm;
//   confirmRetry?: Confirm;
//   question?: string;
//   text?: string;
//   showSolutions?: string;
//   tryAgain?: string;
//   checkAnswer?: string;
//   submitAnswer?: string;
//   notFilledOut?: string;
//   answerIsCorrect?: string;
//   answerIsWrong?: string;
//   answeredCorrectly?: string;
//   answeredIncorrectly?: string;
//   solutionLabel?: string;
//   inputLabel?: string;
//   inputHasTipLabel?: string;
//   tipLabel?: string;
//   scoreBarLabel?: string;
//   a11yCheck?: string;
//   a11yShowSolution?: string;
//   a11yRetry?: string;
//   a11yCheckingModeHeader?: string;
//   questions?: string[];
//   options?: Option[];
//   taskDescription?: string;
//   showSolution?: string;
//   dropZoneIndex?: string;
//   empty?: string;
//   contains?: string;
//   ariaDraggableIndex?: string;
//   correctText?: string;
//   incorrectText?: string;
//   resetDropTitle?: string;
//   resetDropDescription?: string;
//   grabbed?: string;
//   cancelledDragging?: string;
//   feedbackHeader?: string;
//   textField?: string;
// }

// export interface UI {
//   checkAnswerButton: string;
//   submitAnswerButton: string;
//   showSolutionButton: string;
//   tryAgainButton: string;
//   tipsLabel: string;
//   scoreBarLabel: string;
//   tipAvailable: string;
//   feedbackAvailable: string;
//   readFeedback: string;
//   wrongAnswer: string;
//   correctAnswer: string;
//   shouldCheck: string;
//   shouldNotCheck: string;
//   noInput: string;
//   a11yCheck: string;
//   a11yShowSolution: string;
//   a11yRetry: string;
// }

// export interface Answer {
//   correct: boolean;
//   tipsAndFeedback: TipsAndFeedback;
//   text: string;
// }

// export interface TipsAndFeedback {
//   tip: string;
//   chosenFeedback: string;
//   notChosenFeedback: string;
// }

// export interface Behaviour {
//   enableRetry: boolean;
//   disableBackwardsNavigation?: boolean;
//   scaleTextNotCard?: boolean;
//   randomCards?: boolean;
//   maxProficiency?: number;
//   quickProgression?: boolean;
//   autoContinue?: boolean;
//   timeoutCorrect?: number;
//   timeoutWrong?: number;
//   soundEffectsEnabled?: boolean;
//   enableSolutionsButton?: boolean;
//   passPercentage?: number;
//   enableCheckButton?: boolean;
//   type?: string;
//   singlePoint?: boolean;
//   randomAnswers?: boolean;
//   showSolutionsRequiresInput?: boolean;
//   confirmCheckDialog?: boolean;
//   confirmRetryDialog?: boolean;
//   autoCheck?: boolean;
//   showScorePoints?: boolean;
//   allowRetryIfCorrect?: boolean;
//   caseSensitive?: boolean;
//   separateLines?: boolean;
//   acceptSpellingErrors?: boolean;
//   aspectRatio?: string;
//   questionType?: string;
//   maxAlternativesPerRow?: string;
//   instantFeedback?: boolean;
// }

// export interface Choice {
//   subContentId: string;
//   question?: string;
//   answers?: string[];
// }

// export interface Confirm {
//   header: string;
//   body: string;
//   cancelLabel: string;
//   confirmLabel: string;
// }

// export interface Dialog {
//   text: string;
//   answer: string;
//   tips: GlobalBackgroundSelector;
//   audio: Audio[];
// }

// export interface Audio {
//   path: string;
//   mime: string;
//   copyright: Copyright;
// }

// export interface Copyright {
//   license: License;
// }

// export interface L10N {
//   nextButtonLabel?: string;
//   nextButton?: string;
//   showResultsButtonLabel?: string;
//   retryButtonLabel?: string;
//   solutionViewTitle?: string;
//   correctText?: string;
//   incorrectText?: string;
//   shouldSelect?: string;
//   shouldNotSelect?: string;
//   muteButtonLabel?: string;
//   closeButtonLabel?: string;
//   slideOfTotal?: string;
//   scoreBarLabel?: string;
//   solutionListQuestionNumber?: string;
//   a11yShowSolution?: string;
//   a11yRetry?: string;
//   resultHeader?: string;
//   totalScore?: string;
//   resultTableHeader?: string;
//   resultScoreTableHeader?: string;
//   correctAnswerIntroduction?: string;
//   checkAnswerButtonText?: string;
//   submitAnswerButtonText?: string;
//   checkAnswer?: string;
//   showSolutionButtonText?: string;
//   showSolution?: string;
//   correctAnswer?: string;
//   wrongAnswer?: string;
//   shouldCheck?: string;
//   shouldNotCheck?: string;
//   noAnswer?: string;
//   retryText?: string;
//   retry?: string;
//   result?: string;
//   missingAltText?: string;
//   closeModalText?: string;
//   confirmCheck?: Confirm;
//   confirmRetry?: Confirm;
// }

// export interface Media {
//   disableImageZooming: boolean;
//   type?: Type;
// }

// export interface Type {
//   params: TypeParams;
//   library: string;
//   metadata: Metadata;
//   subContentId: string;
// }

// export interface TypeParams {
//   playerMode: string;
//   fitToWrapper: boolean;
//   controls: boolean;
//   autoplay: boolean;
//   playAudio: string;
//   pauseAudio: string;
//   contentName: string;
//   audioNotSupported: string;
//   files: Audio[];
// }

// export interface Option {
//   media: Type;
//   correct: boolean;
// }

// export interface OverallFeedback {
//   from: number;
//   to: number;
// }

///////////////////////
// Generated by ts-to-zod (https://www.npmjs.com/package/ts-to-zod)
//Some schemas can't be generated due to direct or indirect missing dependencies:
//blanksActionSchema x
//dialogCardsActionSchema x
//singleChoiceSetActionSchema x
//multiChoiceActionSchema x
//multiMediaChoiceActionSchema x
//dragTextActionSchema x
//actionSchema x
//elementSchema
//slideSchema
//presentationSchema
//coursePresentationContentSchema
import { z } from "zod";
// import { License } from "";
import { blanksContentSchema } from "./blanks.ts";
import { dialogcardsContentSchema } from "./dialog-cards.ts";
import { singleChoiceSetContentSchema } from "./single-choice-set.ts"; // Adjust file paths
import { MultiChoiceContentSchema } from "./multi-choice.ts";
import { multimediaChoiceContentSchema } from "./multimedia-choice.ts";
import { dragTextContentSchema } from "./drag-text.ts";
// import { generatorTemplateFinder } from "../../../utils/utils.ts";
export const facebookShareSchema = z.object({
    url: z.string(),
    quote: z.string()
});

export const twitterShareSchema = z.object({
    statement: z.string(),
    url: z.string(),
    hashtags: z.string()
});

export const globalBackgroundSelectorSchema = z.object({});
export enum LicenseType {
  U = "U",
}
export const licenseSchema = z.enum(LicenseType);

export const behaviourSchema = z.object({
    enableRetry: z.boolean(),
    disableBackwardsNavigation: z.boolean().optional(),
    scaleTextNotCard: z.boolean().optional(),
    randomCards: z.boolean().optional(),
    maxProficiency: z.number().optional(),
    quickProgression: z.boolean().optional(),
    autoContinue: z.boolean().optional(),
    timeoutCorrect: z.number().optional(),
    timeoutWrong: z.number().optional(),
    soundEffectsEnabled: z.boolean().optional(),
    enableSolutionsButton: z.boolean().optional(),
    passPercentage: z.number().optional(),
    enableCheckButton: z.boolean().optional(),
    type: z.string().optional(),
    singlePoint: z.boolean().optional(),
    randomAnswers: z.boolean().optional(),
    showSolutionsRequiresInput: z.boolean().optional(),
    confirmCheckDialog: z.boolean().optional(),
    confirmRetryDialog: z.boolean().optional(),
    autoCheck: z.boolean().optional(),
    showScorePoints: z.boolean().optional(),
    allowRetryIfCorrect: z.boolean().optional(),
    caseSensitive: z.boolean().optional(),
    separateLines: z.boolean().optional(),
    acceptSpellingErrors: z.boolean().optional(),
    aspectRatio: z.string().optional(),
    questionType: z.string().optional(),
    maxAlternativesPerRow: z.string().optional(),
    instantFeedback: z.boolean().optional()
});

export const confirmSchema = z.object({
    header: z.string(),
    body: z.string(),
    cancelLabel: z.string(),
    confirmLabel: z.string()
});

export const choiceSchema = z.object({
    subContentId: z.string(),
    question: z.string().optional(),
    answers: z.array(z.string()).optional()
});

export const overallFeedbackSchema = z.object({
    from: z.number(),
    to: z.number()
});

export const l10nSchema = z.object({
    nextButtonLabel: z.string().optional(),
    nextButton: z.string().optional(),
    showResultsButtonLabel: z.string().optional(),
    retryButtonLabel: z.string().optional(),
    solutionViewTitle: z.string().optional(),
    correctText: z.string().optional(),
    incorrectText: z.string().optional(),
    shouldSelect: z.string().optional(),
    shouldNotSelect: z.string().optional(),
    muteButtonLabel: z.string().optional(),
    closeButtonLabel: z.string().optional(),
    slideOfTotal: z.string().optional(),
    scoreBarLabel: z.string().optional(),
    solutionListQuestionNumber: z.string().optional(),
    a11yShowSolution: z.string().optional(),
    a11yRetry: z.string().optional(),
    resultHeader: z.string().optional(),
    totalScore: z.string().optional(),
    resultTableHeader: z.string().optional(),
    resultScoreTableHeader: z.string().optional(),
    correctAnswerIntroduction: z.string().optional(),
    checkAnswerButtonText: z.string().optional(),
    submitAnswerButtonText: z.string().optional(),
    checkAnswer: z.string().optional(),
    showSolutionButtonText: z.string().optional(),
    showSolution: z.string().optional(),
    correctAnswer: z.string().optional(),
    wrongAnswer: z.string().optional(),
    shouldCheck: z.string().optional(),
    shouldNotCheck: z.string().optional(),
    noAnswer: z.string().optional(),
    retryText: z.string().optional(),
    retry: z.string().optional(),
    result: z.string().optional(),
    missingAltText: z.string().optional(),
    closeModalText: z.string().optional(),
    confirmCheck: confirmSchema.optional(),
    confirmRetry: confirmSchema.optional()
});

export const uiSchema = z.object({
    checkAnswerButton: z.string(),
    submitAnswerButton: z.string(),
    showSolutionButton: z.string(),
    tryAgainButton: z.string(),
    tipsLabel: z.string(),
    scoreBarLabel: z.string(),
    tipAvailable: z.string(),
    feedbackAvailable: z.string(),
    readFeedback: z.string(),
    wrongAnswer: z.string(),
    correctAnswer: z.string(),
    shouldCheck: z.string(),
    shouldNotCheck: z.string(),
    noInput: z.string(),
    a11yCheck: z.string(),
    a11yShowSolution: z.string(),
    a11yRetry: z.string()
});

export const tipsAndFeedbackSchema = z.object({
    tip: z.string(),
    chosenFeedback: z.string(),
    notChosenFeedback: z.string()
});

export const copyrightSchema = z.object({
    license: licenseSchema
});

export const socialSchema = z.object({
    showFacebookShare: z.boolean(),
    facebookShare: facebookShareSchema,
    showTwitterShare: z.boolean(),
    twitterShare: twitterShareSchema,
    showGoogleShare: z.boolean(),
    googleShareUrl: z.string()
});

export const metadataSchema = z.object({
    contentType: z.string(),
    license: licenseSchema,
    title: z.string()
});

export const answerSchema = z.object({
    correct: z.boolean(),
    tipsAndFeedback: tipsAndFeedbackSchema,
    text: z.string()
});

export const audioSchema = z.object({
    path: z.string(),
    mime: z.string(),
    copyright: copyrightSchema
});

export const typeParamsSchema = z.object({
    playerMode: z.string(),
    fitToWrapper: z.boolean(),
    controls: z.boolean(),
    autoplay: z.boolean(),
    playAudio: z.string(),
    pauseAudio: z.string(),
    contentName: z.string(),
    audioNotSupported: z.string(),
    files: z.array(audioSchema)
});

export const overrideSchema = z.object({
    activeSurface: z.boolean(),
    hideSummarySlide: z.boolean(),
    summarySlideSolutionButton: z.boolean(),
    summarySlideRetryButton: z.boolean(),
    enablePrintButton: z.boolean(),
    social: socialSchema
});

const baseActionSchema = z.object({
    subContentId: z.string(),
    metadata: metadataSchema
});

export const dialogSchema = z.object({
    text: z.string(),
    answer: z.string(),
    tips: globalBackgroundSelectorSchema,
    audio: z.array(audioSchema)
});

export const typeSchema = z.object({
    params: typeParamsSchema,
    library: z.string(),
    metadata: metadataSchema,
    subContentId: z.string()
});

export const mediaSchema = z.object({
    disableImageZooming: z.boolean(),
    type: typeSchema.optional()
});

export const optionSchema = z.object({
    media: typeSchema,
    correct: z.boolean()
});

export const actionParamsSchema = z.object({
    mode: z.string().optional(),
    dialogs: z.array(dialogSchema).optional(),
    behaviour: behaviourSchema,
    answer: z.string().optional(),
    next: z.string().optional(),
    prev: z.string().optional(),
    retry: z.string().optional(),
    correctAnswer: z.string().optional(),
    incorrectAnswer: z.string().optional(),
    round: z.string().optional(),
    cardsLeft: z.string().optional(),
    nextRound: z.string().optional(),
    startOver: z.string().optional(),
    showSummary: z.string().optional(),
    summary: z.string().optional(),
    summaryCardsRight: z.string().optional(),
    summaryCardsWrong: z.string().optional(),
    summaryCardsNotShown: z.string().optional(),
    summaryOverallScore: z.string().optional(),
    summaryCardsCompleted: z.string().optional(),
    summaryCompletedRounds: z.string().optional(),
    summaryAllDone: z.string().optional(),
    progressText: z.string().optional(),
    cardFrontLabel: z.string().optional(),
    cardBackLabel: z.string().optional(),
    tipButtonLabel: z.string().optional(),
    audioNotSupported: z.string().optional(),
    confirmStartingOver: confirmSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    choices: z.array(choiceSchema).optional(),
    overallFeedback: z.array(overallFeedbackSchema).optional(),
    l10n: l10nSchema.optional(),
    media: mediaSchema.optional(),
    answers: z.array(answerSchema).optional(),
    UI: uiSchema.optional(),
    confirmCheck: confirmSchema.optional(),
    confirmRetry: confirmSchema.optional(),
    question: z.string().optional(),
    text: z.string().optional(),
    showSolutions: z.string().optional(),
    tryAgain: z.string().optional(),
    checkAnswer: z.string().optional(),
    submitAnswer: z.string().optional(),
    notFilledOut: z.string().optional(),
    answerIsCorrect: z.string().optional(),
    answerIsWrong: z.string().optional(),
    answeredCorrectly: z.string().optional(),
    answeredIncorrectly: z.string().optional(),
    solutionLabel: z.string().optional(),
    inputLabel: z.string().optional(),
    inputHasTipLabel: z.string().optional(),
    tipLabel: z.string().optional(),
    scoreBarLabel: z.string().optional(),
    a11yCheck: z.string().optional(),
    a11yShowSolution: z.string().optional(),
    a11yRetry: z.string().optional(),
    a11yCheckingModeHeader: z.string().optional(),
    questions: z.array(z.string()).optional(),
    options: z.array(optionSchema).optional(),
    taskDescription: z.string().optional(),
    showSolution: z.string().optional(),
    dropZoneIndex: z.string().optional(),
    empty: z.string().optional(),
    contains: z.string().optional(),
    ariaDraggableIndex: z.string().optional(),
    correctText: z.string().optional(),
    incorrectText: z.string().optional(),
    resetDropTitle: z.string().optional(),
    resetDropDescription: z.string().optional(),
    grabbed: z.string().optional(),
    cancelledDragging: z.string().optional(),
    feedbackHeader: z.string().optional(),
    textField: z.string().optional()
});

export const blanksActionSchema = baseActionSchema.extend({
  library: z.literal("H5P.Blanks"),
  params: blanksContentSchema,
});

export const dialogCardsActionSchema = baseActionSchema.extend({
  library: z.literal("H5P.Dialogcards"),
  params: dialogcardsContentSchema,
});

export const singleChoiceSetActionSchema = baseActionSchema.extend({
  library: z.literal("H5P.SingleChoiceSet"),
  params: singleChoiceSetContentSchema,
});

export const multiChoiceActionSchema = baseActionSchema.extend({
  library: z.literal("H5P.MultiChoice"),
  params: MultiChoiceContentSchema,
});

export const multiMediaChoiceActionSchema = baseActionSchema.extend({
  library: z.literal("H5P.MultiMediaChoice"),
  params: multimediaChoiceContentSchema,
});

export const dragTextActionSchema = baseActionSchema.extend({
  library: z.literal("H5P.DragText"),
  params: dragTextContentSchema,
});
// 3. Combined Discriminated Union
export const actionSchema = z.discriminatedUnion("library", [
  blanksActionSchema,
  dialogCardsActionSchema,
  singleChoiceSetActionSchema,
  multiChoiceActionSchema,
  multiMediaChoiceActionSchema,
  dragTextActionSchema,
]);

// ==========================================
// 1. Element Schema
// ==========================================
export const elementSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  action: actionSchema, // Connected directly to your discriminated union
  alwaysDisplayComments: z.boolean(),
  backgroundOpacity: z.number(),
  displayAsButton: z.boolean(),
  buttonSize: z.string(),
  goToSlideType: z.string(),
  invisible: z.boolean(),
  solution: z.string(),
});

// ==========================================
// 2. Slide Schema
// ==========================================
export const slideSchema = z.object({
  elements: z.array(elementSchema),
  slideBackgroundSelector: globalBackgroundSelectorSchema,
});

// ==========================================
// 3. Presentation Schema
// ==========================================
export const presentationSchema = z.object({
  slides: z.array(slideSchema),
  keywordListEnabled: z.boolean(),
  globalBackgroundSelector: globalBackgroundSelectorSchema,
  keywordListAlwaysShow: z.boolean(),
  keywordListAutoHide: z.boolean(),
  keywordListOpacity: z.number(),
});

// ==========================================
// 4. Course Presentation Content Schema
// ==========================================
export const coursePresentationContentSchema = z.object({
  presentation: presentationSchema,
  override: overrideSchema,
  // Maps { [key: string]: string } safely using 2 arguments
  l10n: z.record(z.string(), z.string()), 
});
// inferred types:
export type FacebookShare = z.infer<typeof facebookShareSchema>;

export type TwitterShare = z.infer<typeof twitterShareSchema>;

export type GlobalBackgroundSelector = z.infer<typeof globalBackgroundSelectorSchema>;

export type License = z.infer<typeof licenseSchema>;

export type Behaviour = z.infer<typeof behaviourSchema>;

export type Confirm = z.infer<typeof confirmSchema>;

export type Choice = z.infer<typeof choiceSchema>;

export type OverallFeedback = z.infer<typeof overallFeedbackSchema>;

export type L10N = z.infer<typeof l10nSchema>;

export type UI = z.infer<typeof uiSchema>;

export type TipsAndFeedback = z.infer<typeof tipsAndFeedbackSchema>;

export type Copyright = z.infer<typeof copyrightSchema>;

export type Social = z.infer<typeof socialSchema>;

export type Metadata = z.infer<typeof metadataSchema>;

export type Answer = z.infer<typeof answerSchema>;

export type Audio = z.infer<typeof audioSchema>;

export type TypeParams = z.infer<typeof typeParamsSchema>;

export type Override = z.infer<typeof overrideSchema>;

export type Dialog = z.infer<typeof dialogSchema>;

export type Type = z.infer<typeof typeSchema>;

export type Media = z.infer<typeof mediaSchema>;

export type Option = z.infer<typeof optionSchema>;

export type ActionParams = z.infer<typeof actionParamsSchema>;

export type BlanksAction = z.infer<typeof blanksActionSchema>;
export type DialogCardsAction = z.infer<typeof dialogCardsActionSchema>;
export type SingleChoiceSetAction = z.infer<typeof singleChoiceSetActionSchema>;
export type MultiChoiceAction = z.infer<typeof multiChoiceActionSchema>;
export type MultiMediaChoiceAction = z.infer<typeof multiMediaChoiceActionSchema>;
export type DragTextAction = z.infer<typeof dragTextActionSchema>;

export type Action = z.infer<typeof actionSchema>;

export type Element = z.infer<typeof elementSchema>;
export type Slide = z.infer<typeof slideSchema>;
export type Presentation = z.infer<typeof presentationSchema>;
export type CoursePresentationContent = z.infer<typeof coursePresentationContentSchema>;

// const {h5p, content} = generatorTemplateFinder("H5P.CoursePresentation");
// const cpc = coursePresentationContentSchema.parse(content);
// const element = cpc.presentation.slides.pop()?.elements.pop();
// if(element && element.action.library === "H5P.Blanks") {
//    element.action.params = blanksContentSchema.parse(element.action.params);

// }
