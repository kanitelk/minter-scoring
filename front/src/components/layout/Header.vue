<template>
  <div class="header">
    <div class="logo">
      <h1>Minter Scoring</h1>
    </div>
    <div class="menu">
      <a class="tlg-link" href="https://tele.click/minterw" target="_blank">Telegram</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue { }

</script>

<style lang="scss">

@import '../../App';

.header {
  background: $primary-orange;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .logo {
    margin-left: 1rem;
    cursor: pointer;
    user-select: none; 

    h1 {
      font-size: 1.4rem;
      color: #fff;

      &:hover {
        color: rgb(221, 221, 221);
      }
    }
  }

  .menu {
    margin-right: 1rem;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
