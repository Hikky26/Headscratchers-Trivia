const dataSaved = sessionStorage.getItem('apiURL')
// const dataSavedArr = JSON.parse(dataSaved)

const questionContainer = document.getElementById('questionsAppendHere')
const form = document.querySelector('#formParent')
const header = document.querySelector('#questionCardHeader')


let numCorrect = 0;
let counter = 0
let questionSet = []
let datum;
let answer = "";



axios.get(dataSaved)
.then(res => {
    const data = res.data.results
    console.log (data)
    startPractice(data)       
})
.catch(err => { console.log(err)})

//step1
const startPractice = (data) => {
    questionSet = [...data];
    displayNextQuestion();
    // console.log(questionSet)
    
};

//step 2
function displayNextQuestion(){
    counter++
    // console.log(counter)
    if(questionSet.length === 0){
        questionContainer.innerHTML = `
        <h1>Game Over</h1>
        <h3>Return Home to keep practicing, or play Trivia to get on the scoreboard</h3>
        <h3>Total Score: ${numCorrect}/${counter-1}</h3>
        `;
        return;
    }
    //step 3
    const datum = questionSet.shift();
    const {category, correct_answer, incorrect_answers, difficulty, question} = datum
    const answersArr = shuffle(correct_answer, incorrect_answers)
    answer = correct_answer
    console.log(answersArr)
    let questionHTML = `
        <div id="questionCardHeader">
            <h1 id="question">Question ${counter}: ${question}</h1>
            <h2 id="numCorr">Number Correct: ${numCorrect}</h2>
            <div id="detailsContainer">
                <h6>Category: ${category}</h6>
                <h6>Difficulty: ${difficulty}</h6>
            </div>
        </div>
        <form id="formParent">
            <label for= "question"> Choose the correct answer:</label>
            <br>
            <div>
                <button type="button" class="answers" value="${answersArr[0]}">${answersArr[0]}</button>
            </div>
            <div>
                <button type="button" class="answers" value="${answersArr[1]}">${answersArr[1]}</button>
            </div>`
    if(answersArr.length === 4){
        questionHTML += `
            <div>
                <button type="button" class="answers" value="${answersArr[2]}">${answersArr[2]}</button>
            </div>
            <div>
                <button type="button" class="answers" value="${answersArr[3]}">${answersArr[3]}</button>
            </div>
        </form>`;}
    displayQuestion(questionHTML)
}
            
//display the question
function displayQuestion(questionHTML){
    questionContainer.innerHTML = ''
    questionContainer.innerHTML += questionHTML
    const ansBtn = document.querySelectorAll('.answers')
    ansBtn.forEach((btn) => {
        btn.addEventListener('click', getData)
    })
}
//shuffle the answer
function shuffle(correct_answer, incorrect_answers){
    let answersArr = [...incorrect_answers]
    const ansIndex = Math.floor(Math.random() * (answersArr.length + 1))
    answersArr.splice(ansIndex, 0, correct_answer)
    return answersArr
}

function checkAnswer (playerAns){
    
    if (playerAns === answer) {
        numCorrect++; // Increment the score if the answer is correct
    }
}
const getData = (e) =>{
    e.preventDefault(); 
    let playerAns = e.target.getAttribute('value')
    console.log(playerAns);
    
if(playerAns){
    console.log('Answer submitted!')
}else{
    playerAns = 'no answer'
}
checkAnswer(playerAns)
displayNextQuestion()
console.log(counter)
}
