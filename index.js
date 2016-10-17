'use strict';

const _ = require('lodash');

module.exports = function(sails) {

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
  function updateOrCreate(criteria, values) {
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
          data = _.first(data);
        }

        return data;
      })
      .then(resolve)
      .catch(reject);
    });
  }

  return {

    /**
     * Default configuration
     */
    defaults: {

      __configKey__: {
        name: 'update-or-create'
      }
    },

    configure: function() {
      // This config will make `updateOrCreate` method
      // available in all models.
      sails.config.models.updateOrCreate = updateOrCreate;
    }

  };

};
