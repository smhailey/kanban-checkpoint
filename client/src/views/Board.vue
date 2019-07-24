<template>
  <!-- <div id="nav">
    <router-link to="/">Boards</router-link> |
  </div> -->
  <div class="board">
    <button class="btn btn-sm btn-outline-danger m-2" @click="logout">Logout</button><br>
    {{board.title}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <list v-for="list in lists" :key="list._id" :listProp='list'></list>
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

      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {
      List
    }
  }
</script>