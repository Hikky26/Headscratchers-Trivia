require('dotenv').config({path:'../.env'});
const {CONNECTION_STRING} = process.env;
const Sequelize = require ('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req,res) =>{
        sequelize.query(`
        drop table if exists high_scores; 

        create table high_scores(
            id serial primary key,
            player_name varchar(50),
            score int,
            date_played date
        );

        insert into high_scores (player_name, score)
        values ('Mr Bean', 800),
            ('Sherlock H', 1200),
            ('Sheldon C', 900),
            ('Tony S', 1000)
            `).then(()=> {
            console.log('db seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
