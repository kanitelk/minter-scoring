<template>
  <v-hover>
  <v-card class="address-form" slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`">
    <v-card-title align-content-center>
      <div class="headline">Введите адрес для проверки</div>
    </v-card-title>
    <v-form v-on:submit.prevent="submit" class="addressForm">
      <v-container>
        <v-layout align-center justify-center>
          <v-flex
            xs10
            md8
            lg8
          >
            <v-text-field
              v-model.trim="address"
              :counter="42"
              label="Address Mx..."
              required
            ></v-text-field>
            <v-btn
              :disabled="address.length !== 42"
              color="success"
              @click="submit"
            >
              Проверить
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
  </v-hover>
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

<style lang="scss" scoped>
  input {
    white-space: nowrap;
    text-overflow: ellipsis !important;
  }
</style>

