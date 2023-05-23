require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT, CONNECTION_STRING} = process.env

const {seed} = require('./seed')
const{} = require('./controller')


