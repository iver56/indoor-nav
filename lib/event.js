/**
 * https://gist.github.com/wildlyinaccurate/3209556
 * @type {{fire, on}}
 */
var Event = function() {

  var self = this;

  self.queue = {};
  self.fired = [];

  return {

    fire: function(event) {
      var queue = self.queue[event];

      if (typeof queue === 'undefined') {
        return;
      }

      queue.forEach((callback) => callback());

      self.fired[event] = true;
    },

    on: function(event, callback) {
      if (self.fired[event] === true) {
        return callback();
      }

      if (typeof self.queue[event] === 'undefined') {
        self.queue[event] = [];
      }

      self.queue[event].push(callback);
    }

  };

}();
