<template>
  <v-container>

    <v-form ref="form" v-model="step1Valid" class="">
      <BaseHeaderSub :text="'Step One'" v-if="!reviewMode" />

      <v-container>
        <v-row>
          <v-col cols="12" lg="6">
            <label>First Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="firstName"
              data-test="text-form-firstName"
              :rules="firstNameRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <label>Last Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="lastName"
              data-test="text-form-lastName"
              :rules="lastNameRules"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div class="hide-on-review">
      <v-btn color="primary" @click="submit" data-test="btn-form-to-next-step">
        <span>Continue</span>
      </v-btn>
      <v-btn text @click="setStep(0)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'FormOneStep1',
  props: {
    reviewMode: Boolean
  },
  data() {
    return {
      step1Valid: false,
      validationFailed: false,
      firstNameRules: [
        v => !!v || 'First name is required',
        v =>
          (v && v.length <= 255) || 'First name must be 255 characters or less'
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v =>
          (v && v.length <= 255) || 'Last name must be 255 characters or less'
      ]
    };
  },
  computed: {
    ...mapGetters('formOne', [
      'formData'
    ]),

    firstName: {
      get() {
        return this.formData.firstName;
      },
      set(value) {
        this.updateFormData({ ['firstName']: value });
      }
    },
    lastName: {
      get() {
        return this.formData.lastName;
      },
      set(value) {
        this.updateFormData({ ['lastName']: value });
      }
    },
  },
  methods: {
    ...mapMutations('formOne', [
      'updateFormData',
      'setStep'
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.setStep('review');
      } else {
        await new Promise(r => setTimeout(r, 200)); //ugh
        const el = document.querySelector(
          '.v-messages.error--text:first-of-type'
        );
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    }
  },
  mounted() {
    if (!this.reviewMode) {
      // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
      // This gets disabled after form submit in step 6
      window.onbeforeunload = () => true;
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  .row {
    div[class^='col-'],
    div[class*=' col-'] {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>
