<template>
  <div class="block address-form-block">
    <div class="block__header">
      <h2>Введите адрес для проверки</h2>
    </div>
    <form v-on:submit.prevent="submit" class="addressForm">
      <input type="text" v-model.trim="address" placeholder="Mx..." required>
      <button :disabled="address.length !== 42" class="primary-button">Проверить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddressForm',
  data() {
    return {
      address: ''
    }
  },
  created() {
    let address = location.search.split('address=')[1]
    if (address !== undefined) {
      this.address = address;
      this.submit();
    }
  },
  methods: {
    submit: function () {
      this.$emit('submit', this.address);
    }
  },
}
</script>

<style lang="scss">
  .address-form-block {
    grid-column: 2 / 10;
  }

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
      background: #F2F2F2;
      border: none;
    }
  }
</style>

