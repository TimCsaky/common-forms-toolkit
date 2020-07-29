<template>
  <div>
    <div v-if="step < 1">

      <Landing :formName="formName" />

      <div class="text-center my-6">
        <v-btn class="px-12" color="primary" @click="startForm" data-test="btn-start">
          <span>Start</span>
        </v-btn>
      </div>
    </div>

    <div v-else>
      <v-stepper v-model="step" alt-labels class="form-stepper elevation-0" @change="setStep">
        <v-container v-if="!submissionComplete" fluid class="pa-0">
          <v-row class="header-row" no-gutters>
            <v-col cols="12" xl="8" offset-xl="2">
              <v-stepper-header class="elevation-0 hidden-xs-only">
                <v-stepper-step
                  :complete="step > 1"
                  data-test="btn-stepper-one"
                  edit-icon="check"
                  :editable="step > 1"
                  step="1"
                >Step One</v-stepper-step>

                <v-divider />


                <v-stepper-step step="" data-test="btn-stepper-review">Review</v-stepper-step>

              </v-stepper-header>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row no-gutters>
            <v-col cols="12" xl="8" offset-xl="2">
              <v-stepper-items>
                <v-stepper-content step="1">
                  <Step1 />
                </v-stepper-content>

                <v-stepper-content step="review">
                  <StepReview />
                </v-stepper-content>
              </v-stepper-items>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { FormNames } from '@/utils/constants';
import Landing from '@/components/common/Landing.vue';
import Step1 from '@/components/formone/Step1.vue';
import StepReview from '@/components/formone/StepReview.vue';

export default {
  name: 'FormOne',
  components: {
    Landing,
    Step1,
    StepReview
  },
  data () {
    return {
      landingValid: false,
    };
  },
  computed: {
    ...mapGetters('formOne', ['step', 'submissionComplete']),
    formName() {
      return FormNames.FORMONE;
    }
  },
  methods: {
    ...mapMutations('formOne', ['setStep']),
    startForm() {
      this.setStep(1);
    }
  }
};
</script>
