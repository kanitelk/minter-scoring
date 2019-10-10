<template>
  <div v-if="isLoading" class="address-view">
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-else class="address-view">
    <Profile :profile="result.profile" class="box" />
    <div class="row">
      <MainInfo :result="result" />
      <CoinsInfo :result="result" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import AddressForm from "../components/AddressForm.vue";
import Profile from "../components/Profile.vue";
import MainInfo from "../components/MainInfo.vue";
import CoinsInfo from "../components/CoinsInfo.vue";
import { getScoring } from "../common/http";

@Component({
  components: {
    Profile,
    MainInfo,
    CoinsInfo
  }
})
export default class Address extends Vue {
  @Prop() address!: string;
  public result: any = null;
  public isLoading = true;

  mounted() {
    this.getScoring();
  }

  async getScoring() {
    this.isLoading = true;
    this.result = await getScoring(this.address);
    this.isLoading = false;

    console.log(this.result);
  }
}
</script>

<style lang="scss" scoped>
.address-view {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.box {
  width: calc(100% - 4rem);
}

.row {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
}

@media screen and (max-width: 1078px) {
  .row {
    width: calc(100% - 1rem);
  }
}
</style>
