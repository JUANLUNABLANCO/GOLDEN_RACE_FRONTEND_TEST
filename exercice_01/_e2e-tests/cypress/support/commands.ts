/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// Cypress.Commands.add('fileRequest', (filePath: string, requestOptions) => {
//   return cy
//     .fixture(filePath, 'binary')
//     .then(binary => Cypress.Blob.binaryStringToBlob(binary))
//     .then(blob => {
//       const formData = new FormData();
//       formData.set('file', blob);

//       return cy.request({ ...requestOptions, form: true, body: formData });
//     });
// });