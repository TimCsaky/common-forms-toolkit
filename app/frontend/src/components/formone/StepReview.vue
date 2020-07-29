<template>
  <v-container>
    <div v-if="submissionComplete">
      <SubmissionConfirmation :formName="formName" :completedSubmission="submissionDetails" />
    </div>
    <div v-else>
      <BaseHeaderSection :text="'Please review your answers'" />
    </div>

    <v-row>
      <v-col offset-lg="1" cols="12" lg="10">
        <v-card outlined class="review-form">
          <h2 class="review-heading">
            1. Step One
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              data-test="btn-form-to-step-one"
              fab
              x-small
              @click="setStep(1)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step1 :reviewMode="true" />
        </v-card>

      </v-col>
    </v-row>

    <div v-if="!submissionComplete">
      <v-btn color="primary" data-test="btn-form-submit" @click="submit">
        <span>Submit</span>
      </v-btn>
      <v-btn text @click="setStep(1)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>

    <v-dialog v-model="submitting" hide-overlay persistent width="300">
      <v-card color="#38598a" dark>
        <v-card-text class="pt-4">
          Submitting Form
          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="submissionError" persistent max-width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2 mb-2" primary-title>
          <v-icon color="red">error</v-icon>Error
        </v-card-title>
        <v-card-text>{{ submissionError }}</v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" data-test="btn-form-error-ok" text @click="setSubmissionError('')">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import SubmissionConfirmation from '@/components/common/SubmissionConfirmation.vue';
import Step1 from '@/components/formone/Step1.vue';
import { FormNames } from '@/utils/constants';

export default {
  name: 'FormOneStep5',
  components: {
    SubmissionConfirmation,
    Step1
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('formOne', [
      'formOneData',
      'submissionComplete',
      'submissionDetails',
      'submissionError',
      'submitting'
    ]),
    formName() {
      return FormNames.FORMONE;
    }
  },
  methods: {
    ...mapMutations('formOne', [
      'setStep',
      'setSubmissionError',
      'updateFormData'
    ]),
    ...mapActions('formOne', ['submitForm']),
    async submit() {
      await this.submitForm();
      if (this.submissionComplete) {
        // Once the form is done disable the native browser "leave site" message so they can quit without getting whined at
        window.onbeforeunload = null;
      }
    }
  },
  mounted() {

    console.log(this.step);

    document
      .querySelectorAll('.review-form input, .review-form .v-select')
      .forEach(q => {
        q.setAttribute('readonly', 'true');
      });
  }
};
</script>

<style scoped lang="scss">
.review-form {
  font-size: smaller;
  margin-bottom: 2em;
  padding: 1em;
  .review-heading {
    margin-left: 0.5em;
    margin-bottom: 1em;
  }
  background-color: #efefef;
  &::v-deep {
    h3,
    .v-input--checkbox {
      margin-top: 0.2em !important;
    }
    .hide-on-review {
      display: none;
    }
  }
}
</style>
