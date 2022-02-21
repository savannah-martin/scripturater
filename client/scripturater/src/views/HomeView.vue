<template>
  <div class="home">
    <h1>SCRIPTURATOR</h1>

    <h2>{{word.word}}</h2>

    <button @click="fetchWord">Get New Word</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      word: {word:'Hebrews', id: 0}
    }
  },
  methods: {
    async fetchWord() {
      //let result = await fetch( "http://localhost:3000/api/word");
      let result = await fetch("/api/word");
      console.log(result);

      let data = await result.json();

      console.log(data)

      this.word = data;
    }
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {

}
</style>
