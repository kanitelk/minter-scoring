<template>
  <div id="app">
    <Header />
    <router-view class="app-container" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import Header from './components/layout/Header.vue';

  @Component({
    name: 'App',
    components: {
      Header
    },
  })
  export default class App extends Vue { }
</script>

<style lang="scss">
  @import 'app.scss';

</style>
