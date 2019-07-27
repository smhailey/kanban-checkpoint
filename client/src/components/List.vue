<template>
  <div class="card col-3 p-2 m-3">
    <h4>List Title: {{listProp.title}}</h4>
    <h4>List Description: {{listProp.description}}</h4>
    <Task :taskProp="task" v-for="task in tasks" :key="task._id"></Task>

    <form @submit.prevent="addTask" class="m-2">
      <input type="text" placeholder="Task Title" v-model="task.title" class="form-control">
      <input type="text" placeholder="Task Description" v-model="task.description" class="form-control">
      <button type="submit" class="btn btn-info btn-sm">Add Task</button>
    </form>
    <!-- <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteList(listProp)"><i
        class="fa fa-trash"></i></button> -->
    <button class="btn btn-danger btn-sm mb-2" @click="deleteList()">Delete List</button>
  </div>
</template>

<script>
  import Task from '../components/Task.vue'

  export default {
    name: 'List',
    props: ['listProp'],
    mounted() {
      this.$store.dispatch("getTasksByList", this.listProp)
    },
    data() {
      return {
        task: {}
      }
    },
    methods: {
      addTask() {
        this.task.listId = this.listProp._id
        this.task.authorId = this.$store.state.user._id
        this.$store.dispatch('addTask', this.task)
        this.task = { title: "", description: "" }
      },

      //FIXME Do I even need a logout method here?
      logout() {
        this.$store.dispatch("logout")
      },

      deleteList() {
        this.$store.dispatch('deleteList', this.listProp);
      },
    },

    computed: {
      tasks() {
        return this.$store.state.tasks[this.listProp._id]
      }
    },
    components: {
      Task
    }
  }
</script>

<style scoped>
</style>