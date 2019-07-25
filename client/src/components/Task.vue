<template>

</template>

<script>
  export default {
    name: 'Task',
      props: ['taskProp'],
          methods: {
            deleteTask(task) {
              this.$store.dispatch('deleteTask', this.taskProp);
            },
          },
  }
</script>

<style scoped>
</style>