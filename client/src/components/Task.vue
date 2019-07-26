<template>
  <div>
    <div>
      <h5>Task Title: {{taskProp.title}}</h5>
    </div>
    <div>
      <h5>Task Description: {{taskProp.description}}</h5>
    </div>
  </div>
</template>

<script>

  // import Comments from './Comment'
  export default {
    name: 'Task',
    props: ['taskProp'],
    mounted() {
    },
    data() {
      return {}
    },
    methods: {
      addComment(comment) {
        this.$store.dispatch('addComment', this.comment)
      },
      deleteTask(task) {
        this.$store.dispatch('deleteTask', this.taskProp);
      },
    },
    computed: {},
    components: {}
  }
</script>

<style scoped>
</style>