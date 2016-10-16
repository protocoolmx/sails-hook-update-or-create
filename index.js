'use strict';

module.exports = function(sails) {

  return {

    /**
     * Default configuration
     */
    defaults: {

      __configKey__: {
        name: 'updateOrCreateHook'
      }
    },

    /**
     * Initialize the hook
     *
     * @param  {Function} cb Callback for when we're done initializing.
     */
    initialize: function(cb) {
      /**
       * Checks for the existence of the record in the first parameter.
       * If it can't be found, the record in the second parameter is created,
       * otherwise it is updated with the second parameter.
       *
       * @param  {Object}   criteria The criteria used to find the record.
       *                             If not found and no 'values' is provided,
       *                             it is also the record that will be created.
       * @param  {Object}   values   The object that you would like to update or
       *                             create.
       * @return {Promise}
       */
      sails.config.models.updateOrCreate = function(criteria, values) {
        return new Promise((resolve, reject) => {
          if (!values) {
            values = criteria.where ? criteria.where : criteria;
          }

          this.findOne(criteria)
          .then((result) => {
            if (result) {
              return this.update(criteria, values);
            }

            return this.create(values);
          })
          .then((data) => {
            if (Array.isArray(data)) {
              data = data[0];
            }

            return data;
          })
          .then(resolve)
          .catch(reject);
        });
      };

      // We're done initializing.
      return cb();
    }
  };

};
