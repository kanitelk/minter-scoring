<template>
  <div class="home-view">
    <AddressForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AddressForm from '../components/AddressForm.vue';

@Component({
  components: { 
    AddressForm
  }
})
export default class Home extends Vue {}
</script>
