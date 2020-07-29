//
// Text options specific to each form
//

// Form-specific options objects
// (these will be populated more later)
const Options = Object.freeze({
  formone: {
    landing: {
      header: 'This is a landing page for your form.',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  }
});


//
// Utility Functions
//

/**
 * @function getFormOptions
 * Returns the specific options for the form
 * @param {string} formName The form name
 * @returns {string} The options object
 */
const getFormOptions = formName => {
  const option = Options[formName];
  if (!option) {
    throw new Error(`Could not retrieve options for form ${formName}`);
  }
  return option;
};

export { Options, getFormOptions };
