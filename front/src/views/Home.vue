<template>
  <div>
    <AddressForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddressForm from '../components/AddressForm.vue';

@Component({
  components: {
    AddressForm
  }
})
export default class Home extends Vue { }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: column wrap;
  }
</style>