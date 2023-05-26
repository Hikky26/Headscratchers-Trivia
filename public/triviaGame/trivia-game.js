//set up URL
const dataSaved = sessionStorage.getItem('trivia')

const myURL = `http://localhost:6260/api`

const questionContainer = document.getElementById('triviaContainer')
const header = document.querySelector('#questionCardHeader')
const lifesConatainer = document.querySelector('#lives')

const currentDate = new Date()
let numCorrect = 0;
let counter = 0;
let questionSet = []
let datum;
let answer = "";
let playerAns = "";
let score= 0;
let streak = 0;
let bonus = 5;
let lives = 3;


axios.get(dataSaved)
.then(res => {
    const data = res.data.results
    console.log(data)
    player_name = prompt(`Enter Your Name: `)
    console.log(player_name)
    if(!player_name){
        player_name = 'Anonymous'
    }
    startGame(data)       
})
.catch(err => { console.log(err)})

const startGame = (data) => {
    displayLives()
    questionSet = [...data];
    setTimeout(()=>displayNextQuestion(), 10000);
    // console.log(questionSet)
    
};
function displayLives(){
    lifesConatainer.innerHTML = "";
    for(let i =0; i < lives; i++){
        let lifeHTML = `<img src="https://th.bing.com/th/id/R.5676313af817f55fc79fd7d339ad79e7?rik=fisCjmGVu6kz6Q&riu=http%3a%2f%2fpowerofpe.co.uk%2fwp-content%2fuploads%2f2016%2f05%2fBrain-heart.png&ehk=7yCnZ9Ew5slfTr%2fum2fLlE2Wq7qbmcNLS%2baklFM4764%3d&risl=&pid=ImgRaw&r=0" alt="Brain in shape of heart">`
        lifesConatainer.innerHTML += lifeHTML
    }
}

function displayNextQuestion(){
    counter++
    // console.log(counter)
    if(questionSet.length === 0 ||  lives === 0){
        questionContainer.innerHTML = `
        <h1>Game Over</h1>
        <h3>Congrats ${player_name}! You made it through a round of Trivia Headscratchers!
            <br>
            Direct to Home to play again!
        </h3>
        <h3>Total Score: ${score}</h3>
        `;
        const body = {
            player_name: player_name,
            score : score,
        }
        addNewScore(body)
        console.log(body)
    }else{
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
        streak++
        if(streak >= 3 && lives < 5){
            lives ++
            displayLives()
        }
        if (streak >= bonus){
            score += 10

        }else{
            score += 5
        }
    }else{
        lives--
        streak = 0
        displayLives()
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
const addNewScore = (body) =>{
    axios.post(`${myURL}/highscores`, body)
        .then(res =>{
            alert(`${player_name} was added to scoreboard`)})
        .catch( err => console.log(err.response.data))}


        