// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

// Currently, Cypress lacks fetch support: https://github.com/cypress-io/cypress/issues/95
// We load the whatwg-fetch polyfill here to translate fetch calls into XHR.
// If we were using the polyfill in the app, we could just delete window.fetch on window:before:load.
let polyfill;

before(() => {
  const polyfillUrl = "https://unpkg.com/whatwg-fetch@3.0.0/dist/fetch.umd.js";
  cy.request(polyfillUrl).then(response => {
    polyfill = response.body;
  });
});

Cypress.on("window:before:load", win => {
  delete win.fetch;
  win.eval(polyfill);
});
