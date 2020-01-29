// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Clicks the Randomize button to make a GET /api/random request, waits for the response, and
// returns a promise that resolves to the result (as a string). If an argument is specified, then
// the request is mocked such that it yields that result.
Cypress.Commands.add("randomize", (...result) => {
  return cy
    .route("/api/random", ...result)
    .as("getRandom")
    .get("[data-testid=randomize]")
    .click()
    .wait("@getRandom")
    .then(xhr => Cypress.Blob.blobToBinaryString(xhr.response.body));
});
