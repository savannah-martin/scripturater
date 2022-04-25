const { randomUUID } = require("crypto");
const fs = require('fs');
const path = require('path');
const express = require("express");
const router = express.Router();

let words = ["hebrews", "proverb", "goliath", "Mystery"];
let ratings = [];


fs.readFile( path.join(__dirname, "../data/7.proper.txt"), 
            "utf-8", 
            (err, data)=> {
                if( err) {
                    console.error( err);
                    return;
                }

                words = data.split('\n');
});

/* WORDS */

/* GET /api/words/ */
/* return all the words from the word list */
router.get("/words", function (req, res, next) {
  
  allWords = []
  for(let i=0; i<words.length;i++) {
    allWords.push( {word: words[i], id: i , verse: "The Lord is my Shepherd..." });
  }

  res.send(allWords);
});

/* GET /api/words/random */
/* return a random word from the word list */
router.get("/words/random", function (req, res, next) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  res.send({ word: randomWord, id: randomIndex, verse: "The Lord is my Shepherd..." });
});


/* GET /api/words/5 */
/* return the given word from the word list */
router.get("/words/:id", function (req, res, next) {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];

  if (!word) {
    // return a 404
    res.status(404).send("No words with that id in database.");
  }

  //const verse = words[wordId].verse
  res.send({ word: word, id: wordId, verse: "The Lord is my Shepherd..." });
});

/* PUT /api/words/5 */
/* updates a word from the word list */
// { "word": "proverb", verse: "This is a proverb..."}
router.put("/word/:id", function (req, res, next) {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];
  const newWord = req.body.word;

  if (!word) {
    // return a 404
    res.status(404).send("No words with that id in database.");
  }

  words[wordId] = newWord;

  //const verse = words[wordId].verse
  res.send({ word: word, id: wordId, verse: "The Lord is my Shepherd..." });
});

// TODO
/* DELETE /api/words/5 */
/* return a random word from the word list */
router.delete("/words/:id", function (req, res, next) {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];

  if (!word) {
    // return a 404
    res.status(404).send("No word with that id in database.");
  }

  words = words.filter( w => w.id !== wordId);

  res.send({ word: word, id: wordId, verse: "The Lord is my Shepherd..." });
});




/* RATINGS */

/* GET /api/word/5/ratings */
/* get all the rating objects for a given word
*/
router.get( '/words/:id/ratings', (req, res)=> {
  const wordId = parseInt(req.params.id);

  const ratingsForWord = ratings.filter( r => r.wordId===wordId );

  res.send(ratingsForWord);
});

/* GET /api/word/5/ratings/id */
/* get the rating object by ratingId
*/
router.get( '/words/:wordId/ratings/:id', (req, res)=> {
  const id = req.params.id;

  const rating = ratings.find( r => r.id===id );
  console.log(rating);

  if( rating ){
    res.send(rating);
  }
  else {
    res.status(404).send("No rating with that id");
  }

  
});

/* POST /api/word/5/ratings */
/* add a new rating object for the given word 
    {"rating" : "like"}
*/
router.post("/words/:id/ratings", function (req, res, next) {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];
  const rating = req.body.rating;

  // add rating object to ratings array
  const ratingId = randomUUID()
  ratings.push({ id: ratingId, wordId, word, rating });

  res.send({ id: ratingId, wordId, word, rating });
});


// TODO 
/* PUT /api/words/5/ratings/1080c5b7-c3c0-4984-9e59-720101719fe2 */
/* edit an existing rating object for a given word
    BODY: {"rating" : "like"}
*/
router.put( '/words/:wordId/ratings/:ratingId', (req, res)=> {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];
  const ratingId = req.params.ratingId;
  const newRating = req.body.rating;
  
  
  const rating = ratings.find(r => r.id === ratingId);


  if (rating) {
    rating.rating = newRating
    res.send(rating)
  }
  else {
    res.status(404).send("No rating with that id.");
  }

});


// TODO 
/* DELETE /api/words/5/ratings/1080c5b7-c3c0-4984-9e59-720101719fe2 */
/* delete an existing rating object for a given word
*/
router.delete( '/words/:wordId/ratings/:ratingId', (req, res)=> {
  const ratingId = req.params.ratingId;
  const rating = ratings.find(r => r.id == ratingId)

  if (!rating){
    res.status(404).send("No raitng with that id.")
  }
  else {
    rating = ratings.filter(r => r.id !== ratingId)
    res.send(rating);
  }
});

module.exports = router;
