<template>
  <div class="card col-3 p-2 m-3">
    <h3>Title: {{listProp.title}}</h3>
    <p>Description: {{listProp.description}}</p>

    <div>
    <form class="addTaskForm" @submit.prevent="addTask" id="addTaskForm">
      <input v-model="task.title" type="text" class="form-control formBox" id="task-title" placeholder="New Task">
      <button type="submit" class="btn">
        <i class="fas fa-plus-circle"></i>
      </button>
    </form>
  </div>
    <!-- TODO Add Task form will go here?We want it to be on the same List card above or next to Delete button-->
    
    <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteList(listProp)"><i class="fa fa-trash"></i></button>
</div>
</template>

<script>

  export default {
    name: 'Lists',
    props: ['listProp'],
    mounted() {
      this.$store.dispatch('getListsByBoard', this.listProp._id)
    },
    data() {
      return {
        task: {
          boardId: this.listProp.boardId,
          listId: this.listProp._id
        }
      }
    },
    methods: {
      addTask(task) {
        this.$store.dispatch('addTask', this.task)
      },

      deleteList(list) {
        this.$store.dispatch('deleteList', this.listProp);
      },
    },

    computed: {
      //TODO need help with this section
    },
components: {
  //REVIEW Should I add Task or Tasks? Either of them broke the code. Probably because we don't have info in the Task.vue yet.
}
  }
</script>

<style scoped>
</style>