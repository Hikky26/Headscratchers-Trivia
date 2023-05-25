require('dotenv').config({path:'../.env'});
const {CONNECTION_STRING} = process.env;
const { all } = require('axios');
const Sequelize = require ('sequelize')

const sequelize = new Sequelize(`${CONNECTION_STRING}`,{
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


//Trivia names to be displayed when player gets a certain score bracket
const triviaNames = [
    {level : 1,
        name : 'Curious Cranium',
        max_score: 100,
        imgSrc : 'https://i.pinimg.com/564x/7c/ba/e8/7cbae8c86850395128d577b001b2a1a4.jpg'},
    {level: 2,
        name: 'Witty Whisker',
        max_score: 200,
        imgSrc:"https://st4.depositphotos.com/1007566/24965/v/600/depositphotos_249650066-stock-illustration-cartoon-brain-creativity.jpg"},
    {level: 3,
        name: 'Inquisitive Intellect',
        max_score: 300,
        imgSrc:"https://i.pinimg.com/564x/5e/18/4e/5e184e0262324940779c99b6580fcdac.jpg"},
    {level: 4,
        name: 'Knowledgeable Noodle',
        max_score: 400,
        imgSrc:"https://previews.123rf.com/images/luplupme/luplupme2001/luplupme200100093/138474291-books-and-human-brain-funny-characters-education-and-studying-concept-vector-illustration-a-smiling.jpg"},
    {level: 5,
        name: 'Quizmaster Mind',
        max_score: 500,
        imgSrc:"https://cdn1.vectorstock.com/i/1000x1000/45/85/strong-healthy-and-smart-cartoon-brain-isolated-vector-34564585.jpg"},
    {level: 6,
        name: 'Trivia Tycoon',
        max_score: 600,
        imgSrc:"https://previews.123rf.com/images/iimages/iimages1501/iimages150100021/35368384-illustration-of-a-duck-reading-books.jpg"},
    {level: 7,
        name: 'Masterful Mentality',
        max_score: 700,
        imgSrc:"https://w7.pngwing.com/pngs/577/676/png-transparent-person-doing-yoga-illustration-human-brain-drawing-cartoon-material-ed-meditation-brain-cartoon-character-game-child.png"},
    {level: 8,
        name: 'Savvy Scholar',
        max_score: 800,
        imgSrc:"https://i.pinimg.com/564x/ba/4f/c0/ba4fc0d9d04f69f94c621aa585ab0512.jpg"},
    {level: 9,
        name: 'Brilliant Brainiac',
        max_score: 900,
            imgSrc:"https://i.pinimg.com/564x/5e/65/73/5e6573266077df71be08954479f7d05f.jpg"},
    {level: 10,
        name: 'Nobel Prize Noggin',
        max_score: 1000,
        imgSrc:"https://w7.pngwing.com/pngs/490/767/png-transparent-nobel-prize-in-physiology-or-medicine-nobel-prize-in-literature-nobel-memorial-prize-in-economic-sciences-nobel-prize-kyoto-nobel-prize-in-physics.png"},
]

module.exports = {

    getScores: (req,res) => {
        sequelize.query(`
        SELECT player_name, score, date_played 
        FROM high_scores
        Order by score desc
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    newScore: (req,res) => {
        const{player_name, score, date} = req.body;
        const query = `
        INSERT INTO high_scores(player_name, score, date_played)
            VALUES ('${player_name}', ${score}, CURRENT_DATE);`;
            sequelize.query(query)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }, 
    getTopTen: (req, res) => {
        const query = `
            SELECT player_name, score, date_played
            From high_scores
            ORDER BY score desc
            LIMIT 10`
        sequelize.query(query)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getEarnedToken: (req,res) => {
        const score = req.body;
        let triviaReward = ""
        for(let i = 0; i< triviaNames.length; i++){
            if(score >=triviaNames[i].max_score){
                triviaReward = triviaNames[i]
                break;
            }
        }
        res.status(200).send(triviaReward)
    },
    getAllTokens: (req, res)=>{
        const allTokens = triviaNames;
        res.status(200).send(allTokens)
    }

}
