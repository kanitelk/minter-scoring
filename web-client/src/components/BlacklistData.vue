<template>
  <div class="blacklist-data box card">
    <div class="icon">
      <v-icon x-large v-if="!data.status" style="color: green">mdi-check-decagram</v-icon>
      <v-icon x-large style="color: red" v-else>mdi-alert-circle-outline</v-icon>
    </div>
    <h4>
      {{address}}
    </h4>
    <p>В блэк-листе: <strong>{{data.status ? 'ДА' : 'НЕТ'}}</strong></p>
    <p v-if="data.description">Описание: {{data.description}}</p>
    <p v-if="data.from">Источник: {{data.from}}</p>
    <p v-if="data.date">Дата добавления: {{(new Date(data.date)).toLocaleDateString()}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class BlacklistData extends Vue {
  @Prop() data: any;
  @Prop() address!: string;

  mounted() {
    
  }
}
</script>

<style lang="scss" scope>
  .blacklist-data {
    display: flex;
    flex-flow: column wrap;
    padding-left: 1rem;
    padding-right: 1rem;

    h4 {
      word-break: break-all;
    }

    .icon {
      display: flex;
      margin-top: 1rem;
      justify-content: center;
    }
  }
</style>