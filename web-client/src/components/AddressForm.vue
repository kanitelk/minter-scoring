<template>
  <div class="card address-form">
    <h2 class="title">Введите адрес</h2>
    <form>
      <input v-model="address" maxlength="42" type="text" placeholder="Mx..." autofocus />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

export enum AddressProp {
  Scoring,
  Blacklist
}

@Component
export default class AddressForm extends Vue {
  @Prop() addressType!: AddressProp;
  public address: string = "";

  @Watch("address") onAddressChange() {
    if (this.address.length === 42 && this.address.toLowerCase().includes("mx"))
      this.submit();
  }

  submit() {
    //console.log(this.address);
    this.$emit("check", this.address);
    if (this.addressType === AddressProp.Scoring) {
      this.$router.push(`/address/${this.address}`);
    } else if (this.addressType === AddressProp.Blacklist) {
      this.$router.push(`/blacklist/${this.address}`);
    }
  }
}
</script>

<style lang="scss">
.address-form {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: 100%;

    input {
      display: flex;
      flex: 1;
      max-width: 60%;
      padding: 0.4rem;
      background-color: #f5f5f5;
      height: 2rem;
      font-size: 1.2rem;
      border: none;
      outline: none;

      &:focus {
        background-color: darken($color: #f5f5f5, $amount: 3);
      }
    }
  }
}

@media screen and (max-width: 1078px) {
  .address-form form input {
    max-width: unset;
  }
}
</style>