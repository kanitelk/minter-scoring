<template>
  <div class="block mscan-profile">
    <div class="logo">
      <img v-if="profile.icon.length > 0" :src="profile.icon" alt="">
      <div class="avatar" v-else></div>
    </div>
    <div class="profile-info">
      <div class="profile-title">
        <h2>{{profile.title}}</h2>
        <i v-if="profile.isVerified" class="material-icons" style="color: green" title="Профиль подтвержден">done_outline</i>
        <i v-if="!profile.isVerified" class="material-icons" style="color: gray" title="Профиль не верифицирован">info</i>
      </div>
      <a :href="profile.www" target="_blank" style="margin-top: -15px;">{{profile.www}}</a>
      <p>{{profile.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MscanProfile',
  props: ['profile', 'explorerURL'],
}
</script>

<style lang="scss">
  @import '../App';
  .mscan-profile {
    grid-column: 2 / 10;
    display: flex;
    flex-flow: row nowrap !important;
    justify-content: flex-start !important;
    align-items: center !important;
    padding-top: 20px;

    .profile-info {
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
      margin-left: 20px;

      .profile-title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .material-icons {
          margin-left: 10px;

          &:hover {
            cursor: default;
          }
        }
      }
    }

    .logo img {
      width: 100px;
      height: 100px;
      border-radius: 5px;

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        background-color: $primary-gray;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .logo {
      .avatar {
        width: 40px;
        height: 40px;
      }
    }

    .profile-info {
      margin-left: 10px;
    }
  }
</style>
