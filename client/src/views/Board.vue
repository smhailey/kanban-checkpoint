<template>
  <div class="board">{{board.title}}
    <!-- <button class="btn btn-danger btn-sm mb-2" @click="deleteBoard">Delete</button> -->
  </div>
</template>

<script>
  import List from '../components/List.vue'

  export default {
    name: "board",
    props: ["boardId"],
    mounted() {
      this.$store.dispatch("getBoards")
      this.$store.dispatch("getLists", this.boardId)
    },
    computed: {
      board() {
        return (
          //FIXME This does not work on page reload because the boards array is empty in the store
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
      }
    },
    components: {
      List
    }
  }
</script>