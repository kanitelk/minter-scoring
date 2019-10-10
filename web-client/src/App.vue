<template>
  <div id="app">
    <Header />
    <router-view class="app-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Header from "./components/layout/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
  .app-container {
    display: flex;
    flex-flow: column wrap;
    align-self: center;
    margin: 1rem;
    width: calc(100vw - 2rem);
    max-width: 1200px;
  }

  @media screen and (max-width: 1400px) {
    .app-container {
      max-width: 1000px;
    }
  }

  @media screen and (max-width: 1078px) {
    .app-container {
      margin: unset;
      width: 100vw;
      max-width: 800px;
    }
  }

  // @media screen and (max-width: 768px) {
  //   .app-container {
  //     max-width: 800px;
  //   }
  // }
</style>
