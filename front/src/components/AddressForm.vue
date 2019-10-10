<template>
  <div class="block address-form-block">
    <div class="block__header">
      <h2>Введите адрес для проверки</h2>
    </div>
    <form v-on:submit.prevent="submit" class="addressForm">
      <input type="text" v-model.trim="address" placeholder="Mx..." required autofocus />
      <button :disabled="address.length !== 42" class="primary-button"></button>
      <!-- <v-icon>{{searchIcon}}</v-icon> -->
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiMagnify } from "@mdi/js";

@Component
export default class AddressForm extends Vue {
  public address: string = "";
  public searchIcon = mdiMagnify;

  submit() {
    this.$emit("submit", this.address);
  }
}
</script>

<style lang="scss">
@import "../app.scss";

.addressForm {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  input {
    width: 60%;
    height: 42px !important;
    padding-left: 7px;
    white-space: nowrap;
    text-overflow: ellipsis !important;
    background: #f2f2f2;
    border: none;
    outline: none;
  }
}
</style>

