<template>
  <div>
    <h3>Title: {{listProp.title}}</h3>
    <p>Description: {{listProp.description}}</p>
    <button class="btn btn-danger btn-sm mb-2" @click="deleteList(listProp)">Delete </button>
  </div>
</template>

<script>

  export default {
    name: 'List',
    props: ['listProp'],
    methods: {
      deleteList(list) {
        this.$store.dispatch('deleteList', list);
      },
    },

  }
</script>

<style scoped>
</style>