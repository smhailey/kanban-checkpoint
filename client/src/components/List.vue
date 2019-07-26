<template>
  <div class="card col-3 p-2 m-3">
    <h3>Title: {{listProp.title}}</h3>
    <p>Description: {{listProp.description}}</p>
    <Task :taskProp="task" v-for="task in tasks"></Task>
    <!--ADD TASK FORM/BUTTON WITHIN LIST CARD-->
    <form @submit.prevent="addTask">
      <input type="text" placeholder="Add Task" v-model="task.title" class="form-control">
      <input type="text" placeholder="Add description" v-model="task.description" class="form-control">
      <button type="submit" class="btn btn-info btn-sm">Add Task</button>
    </form>
    <!--DELETE BUTTON WITHIN LIST CARD-->
    <button class="mt-auto btn btn-danger btn-sm mb-2" @click="deleteList(listProp)"><i
        class="fa fa-trash"></i></button>
  </div>
</template>

<script>
  import Task from '../components/Task.vue'

  export default {
    name: 'List',
    props: ['listProp'],
    mounted() {

    },
    data() {
      return {
        task: {}
      }
    },
    methods: {
      addTask() {
        this.task.listId = this.listProp._id
        this.task.authorId = this.$store.state.user._id //brought in from boardvue
        this.$store.dispatch('addTask', this.task)
        this.task = { title: "", description: "" }
      },

      logout() {
        this.$store.dispatch("logout") //should let logout button work on list page
      },

      deleteList(list) {
        this.$store.dispatch('deleteList', this.listProp);
      },
    },

    computed: {
      tasks() {
        return this.$store.state.tasks[this.listProp._id]
      }
      //TODO need help with this section
    },
    components: {
      Task
    }
  }
</script>

<style scoped>
</style>