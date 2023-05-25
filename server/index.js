require('dotenv').config({path:'../.env'})
const express = require('express')
const app = express()
const cors = require('cors')

const {SERVER_PORT} = process.env

const {seed} = require('./seed.js')
const{} = require


const{getScores, newScore, getTopTen, getAllTokens, getEarnedToken} = require('./controller.js')


app.use(express.json())
app.use(cors())



app.post('/seed', seed)

// //feature 1: Get all the characters the play has earned
// app.get("/api/playerTokens", getPlayerTokens);
// //feature 1A: Get all the tokens but make transparent
// app.get("/api/allTokens", getAllTokens);


// //feature 2: Display top 10 highscores
app.get("/api/topTenScores", getTopTen);
// //feature 2A: Add a persons name and score to ongoing list of highscores
app.post("/api/highscores", newScore)
app.get("/api/highscores", getScores)
// //feature 2B: Replace highscores if new player value greater than values in top 10
// app.put("/api/topTenScores", updateTopTen);
app.get("/api/tokens", getAllTokens)
app.get("/api/earnedTokens", getEarnedToken)



app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))


// // // Function to decode HTML entities
// // function decodeHTMLEntities(text) {
// //     const element = document.createElement('div');
// //     element.innerHTML = text;
// //     return element.innerText;
// //   }
  
// //   // Decoding the question and answers
// //   response.question = decodeHTMLEntities(response.question);
// //   response.correct_answer = decodeHTMLEntities(response.correct_answer);
// //   response.incorrect_answers = response.incorrect_answers.map(answer => decodeHTMLEntities(answer));
  
// //   console.log(response);


