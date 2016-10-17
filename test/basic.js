'use strict';

let Sails = require('sails').Sails;
let assert = require('assert');

 describe('Basic tests ::', function() {

   // Var to hold a running sails app instance
   let sails;

   // Before running any tests, attempt to lift Sails
   before(function (done) {

     // Hook will timeout in 10 seconds
     this.timeout(11000);

     // Attempt to lift sails
     Sails().lift({
       hooks: {
         // Load hooks
         'update-or-create': require('../'),
         'mvcsloader': require('./testHook'),
         // Skip grunt
         'grunt': false
       },
       log: {
         level: 'error'
       },
       models: {
         migrate: 'safe'
       }
     }, (err, _sails) => {
       if (err) {
         return done(err);
       }

       sails = _sails;
       return done();
     });
   });

   // After tests are complete, lower Sails
   after(function (done) {

     // Lower Sails (if it successfully lifted)
     if (sails) {
       return sails.lower(done);
     }
     // Otherwise just return
     return done();
   });

   // Test that Sails can lift with the hook in place
   it ('sails does not crash', function() {
     return true;
   });

   describe('Example Model', function() {

     it('should have .updateOrCreate() method', function() {
       assert(typeof Example.updateOrCreate === 'function');
     });
   });

 });
