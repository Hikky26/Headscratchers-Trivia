require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

const {seed} = require('./seed')
const{} = require

app.use(express.json())

app.listen(5500, () => console.log('Server running on 5500'))


// // Function to decode HTML entities
// function decodeHTMLEntities(text) {
//     const element = document.createElement('div');
//     element.innerHTML = text;
//     return element.innerText;
//   }
  
//   // Decoding the question and answers
//   response.question = decodeHTMLEntities(response.question);
//   response.correct_answer = decodeHTMLEntities(response.correct_answer);
//   response.incorrect_answers = response.incorrect_answers.map(answer => decodeHTMLEntities(answer));
  
//   console.log(response);