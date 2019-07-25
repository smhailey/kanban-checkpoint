<template>
  <div class="card col-3 p-2 m-3">
    <h3>Title: {{listProp.title}}</h3>
    <p>Description: {{listProp.description}}</p>


  <!-- <form class="addTaskForm" @submit.prevent="addTask" id="addTaskForm">
    <input v-model="task.title" type="text" class="form-control formBox" id="task-title" placeholder="New Task">
    <button type="submit" class="btn">
      <i class="fas fa-plus-circle"></i>
    </button>
  </form> -->
  
  <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteList(listProp)">Delete </button>
</div>
</template>

<script>

  export default {
    name: 'Lists',
    props: ['listProp'],
    mounted() {
      this.$store.dispatch('getListsByBoard', this.list._id)
    },
    data() {
      return {
        task: {
          boardId: this.list.boardId,
          listId: this.list._id
        }
      }
    },
    methods: {
      addTask(task) {
        this.$store.dispatch('addTask', this.task).then(task.target.reset(task - title))
      },

      deleteList(list) {
        this.$store.dispatch('deleteList', this.listProp);
      },
    },

    computed: {
      //TODO need help with this section
    },
components: {
  //REVIEW Should I add Task or Tasks? Either of them broke the code.
}
  }
</script>

<style scoped>
</style>