<template>
  <div v-if="isLoading" class="blacklist-view" style="margin-top: 3rem;">
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-else class="blacklist-view">
    <h2>Проверка на Blacklist</h2>
    <AddressForm v-if="!address" v-on:check="getAllData" class="box" :addressType="formType" />
    <BlacklistData v-if="address && blData" :address="address" :data="blData" />
    <Profile v-if="address && profile" :background="getBg()" :profile="profile" class="box" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import AddressForm, { AddressProp } from "../components/AddressForm.vue";
import { getBlacklist, getProfile } from "../common/http";
import BlacklistData from "../components/BlacklistData.vue";
import Profile from "../components/Profile.vue";

@Component({
  components: {
    AddressForm,
    BlacklistData,
    Profile
  }
})
export default class BlackList extends Vue {
  @Prop() address!: string;
  public formType = AddressProp.Blacklist;
  public blData: any = null;
  public profile = null;
  public isLoading = false;

  mounted() {
    if (this.address) {
      this.getData();
      this.getProfile();
    }
  }

  getAllData(addr) {
    console.log(addr);
    
    this.getData(addr);
    this.getProfile(addr);
  }

  async getData(addr = this.address) {
    this.isLoading = true;
    let res;
    try {
      res = await getBlacklist(addr);
      this.blData = res.blacklist;
    } catch (error) {
      alert('Произошла ошибка при получении данных')
    }
    this.isLoading = false;
  }

  async getProfile(addr = this.address) {
    let res;
    try {
      this.profile = await getProfile(addr);
    } catch (error) {}
  }

  getBg() {
    if (this.blData.status === false) return "success";
    else if (this.blData.status === true) return "alert";
    else return null;
  }
}
</script>

<style lang="scss">
.blacklist-view {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.blacklist-view > h2 {
  align-self: flex-start;
  margin-left: 1rem;
}
</style>