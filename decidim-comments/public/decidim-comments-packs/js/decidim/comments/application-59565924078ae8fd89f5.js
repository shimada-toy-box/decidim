/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/decidim-comments-packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/decidim/comments/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/decidim/comments/application.js":
/*!**************************************************************!*\
  !*** ./app/javascript/packs/decidim/comments/application.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_comments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/comments */ "./app/javascript/src/comments.js");

$(() => {
  $("[data-decidim-comments]").each((_i, el) => {
    const $el = $(el);
    const comments = new _src_comments__WEBPACK_IMPORTED_MODULE_0__["CommentsComponent"]($el, $el.data("decidim-comments"));
    comments.mountComponent();
    $(el).data("comments", comments);
  });
});

/***/ }),

/***/ "./app/javascript/src/comments.js":
/*!****************************************!*\
  !*** ./app/javascript/src/comments.js ***!
  \****************************************/
/*! exports provided: CommentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsComponent", function() { return CommentsComponent; });
class CommentsComponent {
  constructor($element, config) {
    this.$element = $element;
    this.commentableGid = config.commentableGid;
    this.commentsUrl = config.commentsUrl;
    this.rootDepth = config.rootDepth;
    this.order = config.order;
    this.lastCommentId = config.lastCommentId;
    this.pollingInterval = config.pollingInterval || 15000;
    this.id = this.$element.attr("id") || this._getUID();
    this.mounted = false;
  }
  /**
   * Handles the logic for mounting the component
   * @public
   * @returns {Void} - Returns nothing
   */


  mountComponent() {
    if (this.$element.length > 0 && !this.mounted) {
      this.mounted = true;

      this._initializeComments(this.$element);

      $(".order-by__dropdown .is-submenu-item a", this.$element).on("click.decidim-comments", () => {
        this._onInitOrder();
      });
    }
  }
  /**
   * Handles the logic for unmounting the component
   * @public
   * @returns {Void} - Returns nothing
   */


  unmountComponent() {
    if (this.mounted) {
      this.mounted = false;

      this._stopPolling();

      $(".add-comment .opinion-toggle .button", this.$element).off("click.decidim-comments");
      $(".add-comment textarea", this.$element).off("input.decidim-comments");
      $(".order-by__dropdown .is-submenu-item a", this.$element).off("click.decidim-comments");
      $(".add-comment form", this.$element).off("submit.decidim-comments");
    }
  }
  /**
   * Adds a new thread to the comments section.
   * @public
   * @param {String} threadHtml - The HTML content for the thread.
   * @returns {Void} - Returns nothing
   */


  addThread(threadHtml) {
    const $parent = $(".comments:first", this.$element);
    const $comment = $(threadHtml);
    const $threads = $(".comment-threads", this.$element);

    this._addComment($threads, $comment);

    this._finalizeCommentCreation($parent);
  }
  /**
   * Adds a new reply to an existing comment.
   * @public
   * @param {Number} commentId - The ID of the comment for which to add the
   *   reply to.
   * @param {String} replyHtml - The HTML content for the reply.
   * @returns {Void} - Returns nothing
   */


  addReply(commentId, replyHtml) {
    const $parent = $(`#comment_${commentId}`);
    const $comment = $(replyHtml);
    const $replies = $(`#comment-${commentId}-replies`);

    this._addComment($replies, $comment);

    $replies.siblings(".comment__additionalreply").removeClass("hide");

    this._finalizeCommentCreation($parent);
  }
  /**
   * Generates a unique identifier for the form.
   * @private
   * @returns {String} - Returns a unique identifier
   */


  _getUID() {
    return `comments-${new Date().setUTCMilliseconds()}-${Math.floor(Math.random() * 10000000)}`;
  }
  /**
   * Initializes the comments for the given parent element.
   * @private
   * @param {jQuery} $parent The parent element to initialize.
   * @returns {Void} - Returns nothing
   */


  _initializeComments($parent) {
    $(".add-comment", $parent).each((_i, el) => {
      const $add = $(el);
      const $form = $("form", $add);
      const $opinionButtons = $(".opinion-toggle .button", $add);
      const $text = $("textarea", $form);
      $opinionButtons.on("click.decidim-comments", this._onToggleOpinion);
      $text.on("input.decidim-comments", this._onTextInput);
      $(document).trigger("attach-mentions-element", [$text.get(0)]);
      $form.on("submit.decidim-comments", () => {
        const $submit = $("button[type='submit']", $form);
        $submit.attr("disabled", "disabled");

        this._stopPolling();
      });
    });

    this._pollComments();
  }
  /**
   * Adds the given comment element to the given target element and
   * initializes it.
   * @private
   * @param {jQuery} $target - The target element to add the comment to.
   * @param {jQuery} $container - The comment container element to add.
   * @returns {Void} - Returns nothing
   */


  _addComment($target, $container) {
    let $comment = $(".comment", $container);

    if ($comment.length < 1) {
      // In case of a reply
      $comment = $container;
    }

    this.lastCommentId = parseInt($comment.data("comment-id"), 10);
    $target.append($container);
    $container.foundation();

    this._initializeComments($container);

    if (window.Decidim.createCharacterCounter) {
      window.Decidim.createCharacterCounter($(".add-comment textarea", $container));
    }
  }
  /**
   * Finalizes the new comment creation after the comment adding finishes
   * successfully.
   * @private
   * @param {jQuery} $parent - The parent comment element to finalize.
   * @returns {Void} - Returns nothing
   */


  _finalizeCommentCreation($parent) {
    const $add = $("> .add-comment", $parent);
    const $text = $("textarea", $add);
    const characterCounter = $text.data("remaining-characters-counter");
    $text.val("");

    if (characterCounter) {
      characterCounter.updateStatus();
    }

    if (!$add.parent().is(".comments")) {
      $add.addClass("hide");
    } // Restart the polling


    this._pollComments();
  }
  /**
   * Sets a timeout to poll new comments.
   * @private
   * @returns {Void} - Returns nothing
   */


  _pollComments() {
    this._stopPolling();

    this.pollTimeout = setTimeout(() => {
      $.ajax({
        url: this.commentsUrl,
        method: "GET",
        contentType: "application/javascript",
        data: {
          "commentable_gid": this.commentableGid,
          "root_depth": this.rootDepth,
          order: this.order,
          after: this.lastCommentId
        }
      }).done(() => {
        this._pollComments();
      });
    }, this.pollingInterval);
  }
  /**
   * Stops polling for new comments.
   * @private
   * @returns {Void} - Returns nothing
   */


  _stopPolling() {
    if (this.pollTimeout) {
      clearTimeout(this.pollTimeout);
    }
  }
  /**
   * Sets the loading comments element visible in the view.
   * @private
   * @returns {Void} - Returns nothing
   */


  _setLoading() {
    const $container = $("> .comments-container", this.$element);
    $("> .comments", $container).addClass("hide");
    $("> .loading-comments", $container).removeClass("hide");
  }
  /**
   * Event listener for the ordering links.
   * @private
   * @returns {Void} - Returns nothing
   */


  _onInitOrder() {
    this._stopPolling();

    this._setLoading();
  }
  /**
   * Event listener for the opinion toggle buttons.
   * @private
   * @param {Event} ev - The event object.
   * @returns {Void} - Returns nothing
   */


  _onToggleOpinion(ev) {
    let $btn = $(ev.target);

    if (!$btn.is(".button")) {
      $btn = $btn.parents(".button");
    }

    const $add = $btn.closest(".add-comment");
    const $form = $("form", $add);
    const $opinionButtons = $(".opinion-toggle .button", $add);
    const $alignment = $(".alignment-input", $form);
    $opinionButtons.removeClass("is-active");
    $btn.addClass("is-active");

    if ($btn.is(".opinion-toggle--ok")) {
      $alignment.val(1);
    } else if ($btn.is(".opinion-toggle--meh")) {
      $alignment.val(0);
    } else if ($btn.is(".opinion-toggle--ko")) {
      $alignment.val(-1);
    }
  }
  /**
   * Event listener for the comment field text input.
   * @private
   * @param {Event} ev - The event object.
   * @returns {Void} - Returns nothing
   */


  _onTextInput(ev) {
    const $text = $(ev.target);
    const $add = $text.closest(".add-comment");
    const $form = $("form", $add);
    const $submit = $("button[type='submit']", $form);

    if ($text.val().length > 0) {
      $submit.removeAttr("disabled");
    } else {
      $submit.attr("disabled", "disabled");
    }
  }

}

/***/ })

/******/ });
//# sourceMappingURL=application-59565924078ae8fd89f5.js.map