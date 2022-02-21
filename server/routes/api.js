const { randomUUID } = require('crypto');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'); 


let words = [];
let ratings = [];

fs.readFile(
    path.join(__dirname,'../data/7.proper.txt'), 
    'utf-8', 
    (err, data) => {

    if(err) {
        console.error(err);
        return;
    }

    words = data.split('\n');
});

/* GET /api/word */
router.get('/word', function(req, res, next) {
    const randomIndex = Math.floor(Math.random()*words.length);
    const randomWord = words[randomIndex];
    
    res.send({id: randomIndex, word: randomWord});
});

/* GET /api/word/4 */
router.get('/word/:id([0-9]+)', function(req, res, next) {
    const id = parseInt(req.params.id);
    const word = words[id];
    
    res.send({id: id, word: word});
});

/* GET /api/word/4 */
router.get('/word/:word([A-Za-z]+)', function(req, res, next) {
    const word = req.params.word;
    for(let i = 0; i < words.length; i++) {
        if ( words[i].toLowerCase() === word.toLowerCase()) {
            res.send({id: i, word: word});
            return;
        }
    }

    res.status(404).send("Word not found.");
});


/* GET /api/word/4/rating */
router.get('/word/:id([0-9]+)/rating', function(req, res, next) {
    const id = parseInt(req.params.id);
    //const word = words[id];

    const ratingsForWord = ratings.filter( rating => rating.wordId===id);

    res.send(ratingsForWord);
});

/* POST /api/word/4/rating */
router.post('/word/:id([0-9]+)/rating', function(req, res, next) {
    const wordId = parseInt(req.params.id);
    const rating = req.body.rating;
    const word = words[wordId];

    const ratingId = randomUUID();
    ratings.push( { id: ratingId, word: word, wordId: wordId, rating: rating});
    res.send( { id: ratingId, word: word, wordId: wordId, rating: rating} );
    
    console.log({ id: ratingId, word: word, wordId: wordId, rating: rating});
});


module.exports = router;
