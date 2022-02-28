<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

export default {

  data() {
    return {
      word: {id:0, word:"hebrews"},
      numberWordsRated: 0
    }
  },
  methods:{
    async loadNewWord() {
      const result = await fetch("http://localhost:3000/api/words/random");
      const word = await result.json();



      this.numberWordsRated++;
      //alert(word.word);

      this.word = word;
    },

    async submitRating(wordId, rating) {
      const result = await fetch(`http://localhost:3000/api/words/${wordId}/ratings`, 
      {
        method:"post", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {rating: rating} )
      });


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

  <h3>{{numberWordsRated}}</h3>

  <a href="" @click.prevent="submitRating(word.id, 'like')">🙁</a>
  <a href="" @click.prevent="submitRating(word.id, 'neutral')">😐</a>
  <a href="" @click.prevent="submitRating(word.id, 'dislike')">🙂</a>

  <br>

  <button @click="loadNewWord">Get Another Word</button>

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

a {
  font-size: 8em;
  text-decoration: none;
}
</style>
