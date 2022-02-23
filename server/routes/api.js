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

/* GET /api/word */
/* return a random word from the word list */
router.get("/word", function (req, res, next) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  res.send({ word: randomWord, id: randomIndex, verse: "The Lord is my Shepherd..." });
});


/* GET /api/word/5 */
/* return a random word from the word list */
router.get("/word/:id", function (req, res, next) {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];

  if (!word) {
    // return a 404
    res.status(404).send("No words with that id in database.");
  }

  //const verse = words[wordId].verse
  res.send({ word: word, id: wordId, verse: "The Lord is my Shepherd..." });
});

/* POST /api/word/5/rating */
/* add a rating object for the given word 
    {"rating" : "like", "id": "3"}
*/
router.post("/word/:id/rating", function (req, res, next) {
  const wordId = parseInt(req.params.id);
  const word = words[wordId];
  const rating = req.body.rating;

  // add rating object to ratings array
  ratings.push({ id: randomUUID(), wordId, word, rating });

  res.send({ wordId, word, rating });
});

router.get( '/word/:id/rating', (req, res)=> {
    const wordId = parseInt(req.params.id);

    const ratingsForWord = ratings.filter( r => r.wordId===wordId );

    res.send(ratingsForWord);
});

module.exports = router;
