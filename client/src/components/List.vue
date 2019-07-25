<template>
  <div class="card col-3 p-2 m-3">
    <h3>Title: {{listProp.title}}</h3>
    <p>Description: {{listProp.description}}</p>
    <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteList(listProp)">Delete </button>
  </div>
</template>

<script>

  export default {
    name: 'List',
    props: ['listProp'],
    methods: {
      deleteList(list) {
        this.$store.dispatch('deleteList', this.listProp);
      },
    },

  }
</script>

<style scoped>
</style>