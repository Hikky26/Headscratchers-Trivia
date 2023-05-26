
const URL = `http://localhost:6260/api`



const highscorebtn = document.querySelector('#highscorebtn')
const highscoreContainer = document.querySelector('#scoresContainer')
const scoresToggle = document.querySelector("#highscorebtn")
const playPracticeBtn = document.querySelector("#submitPracticeTrivia")
const form = document.querySelector('form')
const tokenCont = document.querySelector('#charimageContainer')
const playTriviaBtn = document.querySelector('#startTrivia')


//Highscores functions!
let viewTopTen = false
function viewHighScores () {
    highscoreContainer.innerHTML = ''
    if(viewTopTen === true){
    axios.get(`${URL}/highscores`)
        .then(res => {
            let data = res.data
            let tableHTML = createTable(data)
            highscoreContainer.innerHTML += tableHTML
            console.log(data)
            scoresToggle.textContent = 'View Top Ten Scores'
            viewTopTen = false
        })
        .catch(err => console.log(err))
    }else{
        axios.get(`${URL}/topTenScores`)
        .then(res => {
            let data = res.data
            let tableHTML = createTable(data)
            highscoreContainer.innerHTML += tableHTML
            console.log(data)
            scoresToggle.textContent = 'View All Highscores'
            viewTopTen = true
        })
        .catch(err => console.log(err))
    }
}
function createTable(data) {
    tableHTML =
        `<table id = "highscoresTable">
        ~High Scores~
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>`
    for(let i=0; i<data.length; i++){
        tableHTML += `<tr>
            <td>${data[i].player_name}</td>
            <td>${data[i].score}</td>
         </tr>`;
    }
    tableHTML += `</table>`;
    return tableHTML
}

//practice page functions
function loadpractice(event) {
    event.preventDefault();
    const difficulty = document.querySelector('#practiceDifficulty').value
    const category = document.querySelector('#practiceCategory').value
    
    console.log(difficulty, category)

    let apiURL = `https://opentdb.com/api.php?amount=10`
    if(category !== 'any'){
        apiURL += `&category=${category}`
    }
    if(difficulty !== 'any'){
        apiURL += `&difficulty=${difficulty}`
    }

    sessionStorage.setItem('apiURL', apiURL);
    window.location.href = `../practiceTrivia/practice.html?apiURL=${encodeURIComponent(apiURL)}`;
  
}

function getAllTokens(){
    axios.get(`${URL}/tokens`)
    .then(res =>{
        data = res.data
        for(let i=0; i<data.length; i++){
            const {imgSrc, name, level} = data[i]
            const imgTile = document.createElement('img')
            imgTile.setAttribute("src", imgSrc)
            imgTile.classList.add('imagee')
            tokenCont.appendChild(imgTile)
        }
    })
}

function loadTrivia (event){
    event.preventDefault()
    let apiURL = 'https://opentdb.com/api.php?amount=50'
    sessionStorage.setItem('trivia', apiURL)
    window.location.href = `../triviaGame/triviaQuestions.html?apiURL=${encodeURIComponent(apiURL)}`;
}

getAllTokens()
highscorebtn.addEventListener('click', viewHighScores)
form.addEventListener('submit', loadpractice)
playTriviaBtn.addEventListener('click', loadTrivia)