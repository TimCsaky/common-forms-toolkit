<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2">
          <h2>{{ formOptions.landing.header}}</h2>
          <br />
          <p>{{ formOptions.landing.body}}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getFormOptions } from '@/utils/formOptions';

export default {
  name: 'Landing',
  props: {
    formName: {
      type: String,
      required: true
    }
  },
  computed: {
    formOptions() {
      return getFormOptions(this.formName);
    }
  },
};
</script>

