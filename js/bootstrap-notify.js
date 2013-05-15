/**
 * bootstrap-notify.js v1.0.0
 * --
 * Copyright 2012 Nijiko Yonskai <nijikokun@gmail.com>
 * Copyright 2012 Goodybag, Inc.
 * --
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function ($) {
  var Notification = function (options) {
    // Element collection
    this.$note    = $('<div class="alert"></div>');
    this.options  = $.extend(true, {}, $.notify.defaults, options);
    var _link     = null;

    // Setup from options
    if (this.options.transition)
      if (this.options.transition === 'fade')
        this.$note.addClass('in').addClass(this.options.transition);
      else this.$note.addClass(this.options.transition);
    else this.$note.addClass('fade').addClass('in');

    if (this.options.type)
      this.$note.addClass('alert-' + this.options.type);
    else this.$note.addClass('alert-success');

    if (this.options.message)
      if (typeof this.options.message === 'string')
        this.$note.html(this.options.message);
      else if (typeof this.options.message === 'object')
        if (this.options.message.html)
          this.$note.html(this.options.message.html);
        else if (this.options.message.text)
          this.$note.text(this.options.message.text);

    if (this.options.closable)
      _link = $('<a class="close pull-right">&times;</a>'),
      _link.on('click', $.proxy(Notification.onClose, this)),
      this.$note.prepend(_link);
    
    if (!this.options.element) {
      this.$note = this.$note.wrap('<div class="notifications ' + this.options.position.replace(/\s+/, '-') + '"/>').parent();
      if (!this.options.appendTo) {
          this.options.appendTo = document.body;
      }
      this.$element = $(this.options.appendTo);
    } else
      this.$element = $(this.options.element);
    
    if (this.options.initiallyShown)
      this.show();
     
    return this;
  };

  Notification.prototype.onClose = function () {
    this.options.onClose();
    this.$note.remove();
    this.options.onClosed();
  };

  Notification.prototype.show = function () {
    if (this.options.fadeOut.enabled)
      this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(this.onClose, this));

    this.$element.append(this.$note);
    this.$note.alert();
    return this;
  };

  Notification.prototype.hide = function () {
    if (this.options.fadeOut.enabled)
      this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(this.onClose, this));
    else this.onClose();
    return this;
  };

  $.notify = function (options) {
    return new Notification(options);
  };
  
  $.fn.notify = function(options) {
    $.notify($.extend(true, {}, options, { element: this }));
  };

  $.notify.defaults = {
    type: 'success',
    initiallyShown: true,
    position: 'top right',
    appendTo: null,
    closable: true,
    transition: 'fade',
    fadeOut: {
        enabled: true,
        delay: 3000
    },
    message: null,
    onClose: function() { },
    onClosed: function() { }
  };
})(window.jQuery);