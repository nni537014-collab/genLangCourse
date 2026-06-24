import { speak } from "./tts.js"
import { styleListeningButtonWrapper } from "./style.js"
import {
  // cssSelectorDialog,
  // cssSelectorQuiz,
  // cssQuizListeningQuestion,
  // cssAudioButtonInline,
  // cssAudioButtonQuestion,
  css,
  dataLangSelector,
  speakButtonText,
  h5pContentTypeNames,
  eventNames,
  baseLang,

} from './config.js'
const H5P = window.H5P || {};


/**
 * H5P-Text Utilities
 *
 * Some functions that can be useful when dealing with texts in H5P.
 *
 * param {H5P.jQuery} $
 */
H5P.TTS = (function () {
  'use strict';
  let buttonsVisibleAfterBlur = false;
  /**
   * Create Text Utilities.
   *
   * Might be needed later.
   *
   * @constructor
   */
  function TTS() {

  }

  // Inheritance
  TTS.prototype = Object.create(H5P.EventDispatcher.prototype);
  TTS.prototype.constructor = TTS;

  const onInitialized = () => {
    console.log("init event", H5P.instances);
    (H5P.instances || []).forEach(processH5pInstance);
  }

  const processH5pInstance = instance => {
    console.log("attaching handler to all events for all h5p instances")
    console.log("init", instance.libraryInfo.machineName);
    console.log("should be in: ", Object.values(h5pContentTypeNames.listening));
    //handler for events
    if (Object.values(h5pContentTypeNames.base).includes(instance.libraryInfo.machineName)) {
      buttonsVisibleAfterBlur = (instance.libraryInfo.machineName === h5pContentTypeNames.h5pBlanksName)
      instance.on(eventNames.resize, baseInstanceEventHandler);
    }
    if (Object.values(h5pContentTypeNames.listening).includes(instance.libraryInfo.machineName)) {
      instance.on(eventNames.resize, listeningInstanceEventHandler);
    }

  }

  /**
 * @param {string} speakText
 * @param {string} lang
 * @param {number} repetitions
 * @returns {HTMLSpanElement}
 */
  const createButton = (speakText, lang, repetitions) => {
    const $btn = H5P.jQuery(`<span class="${css.classes.audioButtonDetail}">${speakButtonText}</span>`);
    //@todo move css somewhere better?
    $btn.css('margin-left', '5px');
    $btn.on('click', (e) => {
      e.stopPropagation();
      console.log("speaking", speakText, "language", lang, "repitions", repetitions);
      speak(speakText, lang, repetitions);
    });
    return $btn;
  }
  /**
 * @param {HTMLElement} element - The paragraph element to attach the button to.
 * @param {string} [lang] - Optional language code (falls back to baseLang).
 */
  const addButton = (element, lang) => {
    if (!lang) lang = baseLang;
    // Wrap the current element parameter in jQuery

    const $el = H5P.jQuery(element);
    if ($el.data('processed')) return;
    $el.data('processed', true);

    console.log("processing element:", element);
    const $btn = createButton($el.text(), lang);
    const $wrapper = H5P.jQuery(`<span class="${css.classes.audioButtonInline}"></span>`);
    $wrapper.append($btn);
    if (buttonsVisibleAfterBlur) {
      $btn.hide();
      $el.find('input').on('blur', (e) => {
        $btn.show();
      });
      H5P.jQuery('.h5p-question-content')
        .find('div')
        .css('border-bottom', '1px solid #ccc');
    }
    $el.append($wrapper);
  };

  const listeningInstanceEventHandler = (event) => {
    const $quizzes = H5P.jQuery("." + css.classes.listeningQuestion);
    console.log(`processing ${$quizzes.length} quizzes`)
    $quizzes.each((i, el) => {
      const $el = H5P.jQuery(el);
      if ($el.data('processed')) return;
      $el.data('processed', true);
      console.log('processed el', $el.text().trim(), el);
      const $btn = createButton($el.text().trim(),
        $el.data('lang'),
        2);
      const $wrapper = H5P.jQuery(`<span class="${css.classes.audioButtonQuestion}"></span>`);
      styleListeningButtonWrapper($wrapper)
      $wrapper.append($btn);
      $el.parent().append($wrapper);
      $el.hide();
    })
  }

  const baseInstanceEventHandler = (event) => {
    // console.log('inst', instance.libraryInfo.machineName, 'Event:', event.type, event.data);
    //this code only should run on selected content types
    // resize event is only event that fires when dom changes



    // this func find the correct element(s) to add buttons to 
    // it also gets the lang from html data and passes it
    // to the func that adds button and does assorted logic
    /**
 * @param {HTMLElement} el - The paragraph element to attach the button to.
 * @param {number} [i] - Optional language code (falls back to baseLang).
 */
    const addAllButtons = (i, el) => {

      let lang;
      const $paragraphs = H5P.jQuery(el)
        .find('p')
        .filter(function () {
          const lang = H5P.jQuery(this).data(dataLangSelector);
          if (typeof lang === 'string' &&
            lang.length > 0)
            return true;
        });
      console.log("paragraphs found: ", $paragraphs.length)
      $paragraphs.each((i, el) => addButton(el, H5P.jQuery(this).data(dataLangSelector)))
    }
    // this func creates a button with a onclick handler
    // appends button to element
    // records that button has been added to prevent repeats
    // onclick handler calls speak with lang and "text()" of el 


    //just getting dialogs
    const $dialogs = H5P.jQuery(css.selector.dialog);
    const $quizzes = H5P.jQuery(css.selector.quiz);
    const $els = $dialogs.add($quizzes);

    $els.each(addAllButtons);
    console.log('els length',
      $els.length,
      "Dialogs length",
      $dialogs.length,
      "Quizzes length",
      $quizzes.length);

  }
  //after init we assign listener for all events on all instances
  H5P.externalDispatcher.on(eventNames.initialized, onInitialized);

  return TTS;
})()


