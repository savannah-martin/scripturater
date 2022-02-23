<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

export default {

  data() {
    return {
      word: {id:0, word:"hebrews"}
    }
  },
  methods:{
    loadNewWord: async () =>{
      const result = await fetch("http://localhost:3000/api/word");
      const data = await result.json();

      alert(data.word);

      this.word = data.word;
    }
  },
  mounted() {
    this.loadNewWord();
  }
}

</script>

<template>

  <h1>Scripturater</h1>

  <h2>{{word.word}}</h2>

  <button>🙁</button>
  <button>😐</button>
  <button>🙂</button>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
