<template>
  <div class="home-view">
    <AddressForm :addressType="formType" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AddressForm, { AddressProp } from '../components/AddressForm.vue';

@Component({
  components: { 
    AddressForm
  }
})
export default class Home extends Vue {
  public formType = AddressProp.Scoring;
}
</script>
