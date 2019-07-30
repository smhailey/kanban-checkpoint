<template>
  <div class="card p-2 m-3">
    <h4>Comment Title: {{commentProp.title}}</h4>
    <button class="btn btn-danger btn-sm mb-2" @click="deleteComment()">Delete Comment</button>
  </div>
</template>

<script>

  export default {
    name: 'Comment',
    props: ['commentProp'],
    mounted() { },
    data() {
      return {}
    },
    methods: {

      //FIXME Do I even need a logout method here?
      logout() {
        this.$store.dispatch("logout")
      },
      deleteComment() {
        this.$store.dispatch('deleteComment', this.commentProp);
      },
    },
    computed: {
      tasks() {
        return this.$store.state.comments[this.commentProp._id] //REVIEW This return might not be necessary
      }
    },
    components: {}
  }
</script>

<style scoped>
</style>