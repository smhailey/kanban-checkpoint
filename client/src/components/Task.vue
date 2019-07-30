<template>
  <div>
    <h5>Task Title: {{taskProp.title}}</h5>
    <h5>Task Description: {{taskProp.description}}</h5>

    <form>
      Select list to move task to:
      <select id="taskChanger">
        <option value=:taskProp.title>{{taskProp.title}}</option>
        <option value=:taskProp.title>{{taskProp.title}}</option>
        <option value=:taskProp.title>{{taskProp.title}}</option>
      </select>
    </form>
    <button type="button" onclick="changeTask()">Move task</button>



    <Comment :commentProp="comment" v-for="comment in comments" :key="comment._id"></Comment>


    <!-- drop down on task.vue
drop to show available lists
on click update task with new list id
get all tasksById again -->



    <form @submit.prevent="addComment" class="m-2">
      <input type="text" placeholder="Comment" v-model="comment.title" class="form-control">
      <button type="submit" class="btn btn-info btn-sm">Add Comment</button>
    </form>

    <button class="btn btn-warning btn-sm mb-2" @click="deleteTask()">Delete Task</button>

  </div>
</template>

<script>
  import Comment from '../components/Comment.vue'

  export default {
    name: 'Task',
    props: ['taskProp'],
    mounted() {
      this.$store.dispatch("getCommentsByTaskId", this.taskProp)
    },
    data() {
      return {
        comment: {}
      }
    },
    methods: {
      addComment() {
        this.comment.taskId = this.taskProp._id
        this.comment.authorId = this.$store.state.user._id
        this.$store.dispatch('addComment', this.comment)
        this.comment = { title: "" }
      },
      deleteTask() {
        this.$store.dispatch('deleteTask', this.taskProp);
      },
      changeTask() {
        let newTask = document.getElementById("taskChanger").value;
        document.getElementById("demo").innerHTML = newTask;
      }
    },
    computed: {
      comments() {
        return this.$store.state.comments[this.taskProp._id]
      }
    },
    components: {
      Comment
    }
  }
</script>

<style scoped>
</style>