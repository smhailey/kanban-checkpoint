<template>
<!-- TODO Delete Task button and Add Comment form will go here -->
</template>

<script>
  // import Comments from './Comment'
  export default {
    name: 'Tasks',
      props: ['taskProp'],
      mounted() {
        this.$store.dispatch('....', this.task._id)
      }, //TODO getComments will go in the string.
      data() {
        return {
          comment:{
            boardId: this.task.boardId,
            listId: this.task.listId,
            taskId: this.task.task._id
          }
        }
      },
          methods: {
            addComment(comment) {
              this.$store.dispatch('addComment', this.comment)
            },
            deleteTask(task) {
              this.$store.dispatch('deleteTask', this.taskProp);
            },
          },
          computed: {
            //TODO
          },
          components: {
            //TODO Comments. Need to create a Comments.vue?
          }
  }
</script>

<style scoped>
</style>