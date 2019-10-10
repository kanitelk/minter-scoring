<template>
  <div class="header">
    <div class="logo">
      <h2 @click="$router.push('/')">Minter Scoring</h2>
    </div>
    <div class="menu">
      <a href="https://t.me/minterw" target="_blank">
        Telegram
        <v-icon teal>mdi-telegram</v-icon>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style lang="scss" scope>
  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(80, 0, 228);
  }

  .header .logo {
    margin-left: 1rem;
    color: #fff;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      color: darken(#f5f5f5, $amount: 10);
    }

    h2 {
      font-size: 1.15rem;
    }
  }

  .menu {
    margin-right: 1rem;
  }

  .menu a {
    color: #fff;
    text-decoration: none;
    transition: all .3s;

    &:hover {
      color: darken(#f5f5f5, $amount: 10);
    }
  }
</style>