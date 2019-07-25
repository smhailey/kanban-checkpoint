<template>
  <!-- <div id="nav">
    <router-link to="/">Boards</router-link> |
  </div> -->
  <div class="board">
    <button class="btn btn-sm btn-outline-danger m-2" @click="logout">Logout</button>
    <br>
    <h1>{{board.title}}</h1>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>

    <!--//SECTION List within a board: cards -->

    // FIXME Need to move display info below to List.vue and replace it with a components link!

    <div class="row justify-content-center">
      <div class="card col-3 p-2 m-3" v-for="list in lists" :key="list._id">

        <h4>Title: {{list.title}}</h4>
        <p>Description: {{list.description}}</p>

        <button class="btn btn-danger btn-sm mb-2" @click="deleteList(list)">Delete </button>
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
    computed: {
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      },
      lists() {
        return (
          this.$store.state.lists
        )
      }
    },
    methods: {
      addList() {
        this.newList.boardId = this.board._id
        this.newList.authorId = this.$store.state.user._id
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", description: "" };
      },
      // FIXME Need to remove this deleteList and get deleteList in List.vue to work!
      deleteList(list) {
        this.$store.dispatch('deleteList', list);
      },
      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {
      List
    }
  }
</script>