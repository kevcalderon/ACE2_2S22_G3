const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

//Routes API
//Dev: localhost:3000
//Deploy: https://api-ace2-pract2.herokuapp.com
app.use(require('./routes/indexRoute'))

app.get('/', (req, res) => {
    res.send('ACE2 Práctica 2')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server on port', process.env.PORT || 3000)
})