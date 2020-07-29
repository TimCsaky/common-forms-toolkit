import commonFormService from '@/services/commonFormService';
import { FormNames } from '@/utils/constants';

// Change the supplied state to the exact format required by the API endpoint
// Any data guards/sanitation can go in here
function transformToPost(state) {
  // TODO: unit test this!
  const copy = JSON.parse(JSON.stringify(state));

  // Recursive remove all '' fields from body to post
  // https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
  // const cleanEmpty = copy => Object.entries(copy)
  //   .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
  //   .reduce((a, [k, v]) => (v === '' ? a : { ...a, [k]: v }), {});

  // Sanitize the optional fields in case they get checked, filled out, unchecked
  const body = {
    formData: copy.formData
  };
  return body;
}

// Change the results of the API fetch to the store state format
function transformToState(data) {
  // TODO: unit test this!
  const copy = JSON.parse(JSON.stringify(data));

  return {
    formData: copy.formData
  };
}

export default {
  namespaced: true,
  state: {
    getFormError: '',
    gettingForm: false,
    submitting: false,
    step: 0,
    submissionComplete: false,
    submissionDetails: null,
    submissionError: '',

    // Form schema
    formData: {
      firstName: '',
      lastName: ''
    }
  },
  getters: {
    getFormError: state => state.getFormError,
    gettingForm: state => state.gettingForm,
    step: state => state.step,
    submitting: state => state.submitting,
    submissionComplete: state => state.submissionComplete,
    submissionDetails: state => state.submissionDetails,
    submissionError: state => state.submissionError,

    // Form objects
    formData: state => state.formData
  },

  mutations: {
    setGetFormError(state, errorMessage) {
      state.getFormError = errorMessage;
    },
    setGettingForm(state, isGetting) {
      state.gettingForm = isGetting;
    },
    setSubmitting(state, isSubmitting) {
      state.submitting = isSubmitting;
    },
    setStep: (state, step) => {
      window.scrollTo(0, 0);
      state.step = step;
    },
    setSubmissionComplete(state) {
      state.submissionComplete = true;
      window.scrollTo(0, 0);
    },
    setSubmissionDetails(state, responseData) {
      state.submissionDetails = responseData;
    },
    setSubmissionError(state, errorMessage) {
      state.submissionError = errorMessage;
    },

    // Form updates
    updateFormData: (state, obj) => {
      Object.assign(state.formData, obj);
    }
  },




  actions: {


    async getForm({ commit }, id) {
      commit('setGettingForm', true);
      commit('setGetFormError', '');
      try {
        const response = await commonFormService.getSubmission(FormNames.FORMONE, id);
        if (!response.data) {
          throw new Error(`Failed to GET for ${id}`);
        }
        const transformed = transformToState(response.data);

        commit('updateFormData', transformed.formData);


        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error getting form: ${error}`); // eslint-disable-line no-console
        commit('setGetFormError', 'An error occurred while attempting to fetch details. Please refresh and try again.');
      } finally {
        commit('setGettingForm', false);
      }
    },




    async submitForm({ commit, state }) {
      commit('setSubmitting', true);
      commit('setSubmissionError', '');
      try {
        const body = transformToPost(state);
        const response = await commonFormService.sendSubmission(FormNames.FORMONE, body);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        commit('setSubmissionDetails', response.data);
        commit('setSubmissionComplete');
      } catch (error) {
        console.error(`Error submitting form: ${error} - ${error.message}`); // eslint-disable-line no-console
        commit('setSubmissionError', 'An error occurred while attempting to submit the form. Please try again.');
      } finally {
        commit('setSubmitting', false);
      }
    },




  }
};
