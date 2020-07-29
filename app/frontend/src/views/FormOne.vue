<template>
  <div>
    <AdminNavBar :formName="formName" />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AdminNavBar from '@/components/common/admin/AdminNavBar.vue';
import formOne from '@/store/modules/formone/formOne.js';
import { FormNames } from '@/utils/constants';

export default {
  name: 'FormOne',
  components: {
    AdminNavBar
  },
  beforeDestroy() {
    this.$store.unregisterModule('formOne');
  },
  computed: {
    formName() {
      return FormNames.FORMONE;
    }
  },
  created() {
    if(this.$store.hasModule('formOne')) {
      this.$store.unregisterModule('formOne');
    }
    this.$store.registerModule('formOne', formOne);
  }
};
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
