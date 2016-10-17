'use strict';

module.exports = function (sails) {

  let loader = require('sails-util-mvcsloader')(sails);

  return {

    initialize: function (cb) {

      // Load models from custom directory
      loader.adapt({
        models: __dirname + '../api/models', // Path to your hook's models
      }, (err) => {
        return cb(err);
      });
    }
  };
};
