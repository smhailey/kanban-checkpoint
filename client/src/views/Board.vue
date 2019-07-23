<template>
  <div class="board">
    <button class="btn btn-sm btn-outline-danger m-2" @click="logout">Logout</button><br>
    {{board.title}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id">
      <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
      <button class="btn btn-danger btn-sm mb-2" @click="deleteList(list._id)">Delete </button>
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
      this.$store.dispatch("getLists", this.boardId)
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
      handleSubmit() {
        let data = {
          title: this.title,
          boardId: this.boardId
        }
        this.$store.dispatch('addList', data)
      },
      addList() {
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", description: "" };
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', ListId);
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