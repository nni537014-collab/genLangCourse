// import type { LibraryNames } from "../../types.ts";
import type { BlanksContent } from "./blanks.ts";
import type { DialogcardsContent } from "./dialog-cards.ts";
import type { DragTextContent } from "./drag-text.ts";
import type { MultiChoiceContent } from "./multi-choice.ts";
import type { MultimediaChoiceContent } from "./multimedia-choice.ts";
import type { SingleChoiceSetContent } from "./single-choice-set.ts";

export interface CoursePresentationContent {
  presentation: Presentation;
  override: Override;
  l10n: { [key: string]: string };
}

export interface Override {
  activeSurface: boolean;
  hideSummarySlide: boolean;
  summarySlideSolutionButton: boolean;
  summarySlideRetryButton: boolean;
  enablePrintButton: boolean;
  social: Social;
}

export interface Social {
  showFacebookShare: boolean;
  facebookShare: FacebookShare;
  showTwitterShare: boolean;
  twitterShare: TwitterShare;
  showGoogleShare: boolean;
  googleShareUrl: string;
}

export interface FacebookShare {
  url: string;
  quote: string;
}

export interface TwitterShare {
  statement: string;
  url: string;
  hashtags: string;
}

export interface Presentation {
  slides: Slide[];
  keywordListEnabled: boolean;
  globalBackgroundSelector: GlobalBackgroundSelector;
  keywordListAlwaysShow: boolean;
  keywordListAutoHide: boolean;
  keywordListOpacity: number;
}

export interface GlobalBackgroundSelector {}

export interface Slide {
  elements: Element[];
  slideBackgroundSelector: GlobalBackgroundSelector;
}

export interface Element {
  x: number;
  y: number;
  width: number;
  height: number;
  action: Action;
  alwaysDisplayComments: boolean;
  backgroundOpacity: number;
  displayAsButton: boolean;
  buttonSize: string;
  goToSlideType: string;
  invisible: boolean;
  solution: string;
}

export type Action = 
    BlanksAction 
    | DialogCardsAction 
    | SingleChoiceSetAction 
    | MultiChoiceAction 
    | DragTextAction
    | MultiMediaChoiceAction;

interface BaseAction {
  subContentId: string;
  metadata: Metadata;
}

// 3. Create the individual action interfaces (The Discriminated Variants)
interface BlanksAction extends BaseAction {
  library: "H5P.Blanks";
  params: BlanksContent; // Unique params for Blanks
}

interface DialogCardsAction extends BaseAction {
  library: "H5P.Dialogcards";
  params: DialogcardsContent; // Unique params for Blanks
}

interface SingleChoiceSetAction extends BaseAction {
  library: "H5P.SingleChoiceSet";
  params: SingleChoiceSetContent; // Unique params for Blanks
}
interface MultiChoiceAction extends BaseAction {
  library: "H5P.MultiChoice";
  params: MultiChoiceContent; // Unique params for Blanks
}
interface MultiMediaChoiceAction extends BaseAction {
  library: "H5P.MultiMediaChoice";
  params: MultimediaChoiceContent; // Unique params for Blanks
}
interface DragTextAction extends BaseAction {
  library: "H5P.DragText";
  params: DragTextContent; // Unique params for Blanks
}
export interface Metadata {
  contentType: string;
  license: License;
  title: string;
}

export enum License {
  U = "U",
}

export interface ActionParams {
  mode?: string;
  dialogs?: Dialog[];
  behaviour: Behaviour;
  answer?: string;
  next?: string;
  prev?: string;
  retry?: string;
  correctAnswer?: string;
  incorrectAnswer?: string;
  round?: string;
  cardsLeft?: string;
  nextRound?: string;
  startOver?: string;
  showSummary?: string;
  summary?: string;
  summaryCardsRight?: string;
  summaryCardsWrong?: string;
  summaryCardsNotShown?: string;
  summaryOverallScore?: string;
  summaryCardsCompleted?: string;
  summaryCompletedRounds?: string;
  summaryAllDone?: string;
  progressText?: string;
  cardFrontLabel?: string;
  cardBackLabel?: string;
  tipButtonLabel?: string;
  audioNotSupported?: string;
  confirmStartingOver?: Confirm;
  title?: string;
  description?: string;
  choices?: Choice[];
  overallFeedback?: OverallFeedback[];
  l10n?: L10N;
  media?: Media;
  answers?: Answer[];
  UI?: UI;
  confirmCheck?: Confirm;
  confirmRetry?: Confirm;
  question?: string;
  text?: string;
  showSolutions?: string;
  tryAgain?: string;
  checkAnswer?: string;
  submitAnswer?: string;
  notFilledOut?: string;
  answerIsCorrect?: string;
  answerIsWrong?: string;
  answeredCorrectly?: string;
  answeredIncorrectly?: string;
  solutionLabel?: string;
  inputLabel?: string;
  inputHasTipLabel?: string;
  tipLabel?: string;
  scoreBarLabel?: string;
  a11yCheck?: string;
  a11yShowSolution?: string;
  a11yRetry?: string;
  a11yCheckingModeHeader?: string;
  questions?: string[];
  options?: Option[];
  taskDescription?: string;
  showSolution?: string;
  dropZoneIndex?: string;
  empty?: string;
  contains?: string;
  ariaDraggableIndex?: string;
  correctText?: string;
  incorrectText?: string;
  resetDropTitle?: string;
  resetDropDescription?: string;
  grabbed?: string;
  cancelledDragging?: string;
  feedbackHeader?: string;
  textField?: string;
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
  disableBackwardsNavigation?: boolean;
  scaleTextNotCard?: boolean;
  randomCards?: boolean;
  maxProficiency?: number;
  quickProgression?: boolean;
  autoContinue?: boolean;
  timeoutCorrect?: number;
  timeoutWrong?: number;
  soundEffectsEnabled?: boolean;
  enableSolutionsButton?: boolean;
  passPercentage?: number;
  enableCheckButton?: boolean;
  type?: string;
  singlePoint?: boolean;
  randomAnswers?: boolean;
  showSolutionsRequiresInput?: boolean;
  confirmCheckDialog?: boolean;
  confirmRetryDialog?: boolean;
  autoCheck?: boolean;
  showScorePoints?: boolean;
  allowRetryIfCorrect?: boolean;
  caseSensitive?: boolean;
  separateLines?: boolean;
  acceptSpellingErrors?: boolean;
  aspectRatio?: string;
  questionType?: string;
  maxAlternativesPerRow?: string;
  instantFeedback?: boolean;
}

export interface Choice {
  subContentId: string;
  question?: string;
  answers?: string[];
}

export interface Confirm {
  header: string;
  body: string;
  cancelLabel: string;
  confirmLabel: string;
}

export interface Dialog {
  text: string;
  answer: string;
  tips: GlobalBackgroundSelector;
  audio: Audio[];
}

export interface Audio {
  path: string;
  mime: string;
  copyright: Copyright;
}

export interface Copyright {
  license: License;
}

export interface L10N {
  nextButtonLabel?: string;
  nextButton?: string;
  showResultsButtonLabel?: string;
  retryButtonLabel?: string;
  solutionViewTitle?: string;
  correctText?: string;
  incorrectText?: string;
  shouldSelect?: string;
  shouldNotSelect?: string;
  muteButtonLabel?: string;
  closeButtonLabel?: string;
  slideOfTotal?: string;
  scoreBarLabel?: string;
  solutionListQuestionNumber?: string;
  a11yShowSolution?: string;
  a11yRetry?: string;
  resultHeader?: string;
  totalScore?: string;
  resultTableHeader?: string;
  resultScoreTableHeader?: string;
  correctAnswerIntroduction?: string;
  checkAnswerButtonText?: string;
  submitAnswerButtonText?: string;
  checkAnswer?: string;
  showSolutionButtonText?: string;
  showSolution?: string;
  correctAnswer?: string;
  wrongAnswer?: string;
  shouldCheck?: string;
  shouldNotCheck?: string;
  noAnswer?: string;
  retryText?: string;
  retry?: string;
  result?: string;
  missingAltText?: string;
  closeModalText?: string;
  confirmCheck?: Confirm;
  confirmRetry?: Confirm;
}

export interface Media {
  disableImageZooming: boolean;
  type?: Type;
}

export interface Type {
  params: TypeParams;
  library: string;
  metadata: Metadata;
  subContentId: string;
}

export interface TypeParams {
  playerMode: string;
  fitToWrapper: boolean;
  controls: boolean;
  autoplay: boolean;
  playAudio: string;
  pauseAudio: string;
  contentName: string;
  audioNotSupported: string;
  files: Audio[];
}

export interface Option {
  media: Type;
  correct: boolean;
}

export interface OverallFeedback {
  from: number;
  to: number;
}
