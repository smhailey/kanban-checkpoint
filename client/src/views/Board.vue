<template>
  <div class="board">
    <button class="btn btn-sm btn-outline-danger m-2" @click="logout">Logout</button>
    <br>
    <h1>Board Title: {{board.title}}</h1>
    <form @submit.prevent="addList">
      <input type="text" placeholder="List Title" v-model="newList.title" required>
      <input type="text" placeholder="List Description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div class="row justify-content-center">
      <List :listProp="list" v-for="list in lists" :key="list._id"></List>
    </div>
  </div>
  </div>
</template>

<script>
  import List from '../components/List.vue'

  export default {
    name: "board",
    props: ["boardId"],
    data() {
      return {
        newList: {
          title: "",
          description: ""
        }
      }
    },
    mounted() {
      this.$store.dispatch("getBoards")
      this.$store.dispatch("getListsByBoard", this.boardId)
    },
    methods: {
      addList() {
        this.newList.boardId = this.board._id
        this.newList.authorId = this.$store.state.user._id
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", description: "" };
      },
      logout() {
        this.$store.dispatch("logout")
      }
    },
    computed: {
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      },
      lists() {
        return this.$store.state.lists
      }
    },
    components: {
      List
    }
  }
</script>