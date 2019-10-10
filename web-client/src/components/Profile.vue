<template>
  <div class="card profile">
    <div class="avatar">
      <img :src="profile.icon" @error="defaultAvatar" />
    </div>
    <div class="payload">
      <div class="name">
        <h2>{{profile.title}}</h2>
        <v-icon v-if="profile.isVerified" class="verified">mdi-check-decagram</v-icon>
        <v-icon v-else>mdi-alert-circle-outline</v-icon>
      </div>
      <div class="description">{{profile.description}}</div>
      <div class="site" v-html="profile.www" v-linkified></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import config from "../config";

@Component
export default class Profile extends Vue {
  @Prop() profile: any;

  defaultAvatar(e: any) {
    e.target.src = config.avatarURL + this.profile.address;
  }
}
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .avatar {
    margin-right: 20px;
    min-width: 80px;
    max-width: 80px;
    max-height: 80px;

    img {
      -webkit-user-drag: none;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      object-fit: cover;
    }
  }

  .payload {
    display: flex;
    flex-flow: column wrap;

    .name {
      display: flex;
      flex-flow: row nowrap;

      h2 {
        line-height: 0;
      }

      i {
        margin-left: 5px;
        color: gray;
      }

      i.verified {
        color: #87bb44;
      }
    }

    .description {
      margin-top: 10px;
    }

    .site {
      margin-top: 10px;
    }
  }
}
</style>