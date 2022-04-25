<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

export default {

  data() {
    return {
      word: {id:0, word:"hebrews"},
      numberWordsRated: 0,
      history: [],
    }
  },
  methods:{
    async loadNewWord() {
      const result = await fetch("http://localhost:3000/api/words/random");
      const word = await result.json();



      this.numberWordsRated++;
      //alert(word.word);

      this.word = word;
      let cleanWord = word.word.slice(0,7).toUpperCase();
      this.history.push(cleanWord);
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

    this.loadNewWord();
    }
  },
  mounted() {
    this.loadNewWord();
  }
}

</script>

<template>
  <div>
  <h1>Scripturater</h1>

  <h2>{{word.word}}</h2>

  <h3>{{numberWordsRated}}</h3>

  <a href="" @click.prevent="submitRating(word.id, 'like')">🙁</a>
  <a href="" @click.prevent="submitRating(word.id, 'neutral')">😐</a>
  <a href="" @click.prevent="submitRating(word.id, 'dislike')">🙂</a>

  <br>

  <button @click="loadNewWord">Prefer Not to Say</button>

  <h2 class="history-title">History:</h2>

  <p class="history">{{this.history.join(' ')}}</p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 90vw;
  height: 90vh;
}
*{
  background:#C9C78B;
}
a {
  font-size: 8em;
  text-decoration: none;
  color: white;
}
h1 {
  font-size: 4em;
  text-transform: uppercase;
}
h2 {
  font-size: 2.4em;
}
button {
  background-color: #1e2d3b;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 3%;
  margin: 10%;
  color: white;
  font-size: 2em;
}
a:hover {
  color: rgb(218, 218, 218);
  text-shadow: 6px 6px 0px rgba(0,0,0,0.2);
  border-radius: 15px 50px;
}
.history-title {
  text-align: center;
  margin-left: 2%;
}
.history {
  max-width: 65vw;
  overflow: wrap;
  text-align: justify;
  padding: 20px;
  font-size: 1.2em;
  display: flex;
  margin: auto;
}
</style>
