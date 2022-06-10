const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap-name'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

// Required to read form input data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// GET - READ
app.get('/', (req, res) => {
    db.collection('rappers').find().sort({likes: -1}).toArray()
        .then(rappers => res.render('index.ejs', {info: rappers}))
        .catch(err => console.error(err))
})

// POST - CREATE
app.post('/addRapper', (req, res) => {
    console.log(req.body)
    db.collection('rappers').insertOne({
        name: req.body.name,
        birthName: req.body.birthName,
        likes: 0
    })
        .then(result => console.log(result))
        .catch(err => console.error(err))

    res.redirect('/')
})

// DELETE - DELETE
app.delete('/deleteRapper', (req, res) => {
    const name = req.body.name
    const birthName = req.body.birthName

    db.collection('rappers').deleteOne({name: name, birthName: birthName})
    // rappers = rappers.filter(rapper => rapper.name !== name || rapper.birthName !== birthName)

    res.json('rapper deleted')
})

// PUT - UPDATE
app.put('/upvote', (req, res) => {
    const name = req.body.name
    const birthName = req.body.birthName
    const likes = req.body.likes
    
    db.collection('rappers').updateOne({name: name, birthName: birthName},{ 
            $set: { 
                likes: likes + 1
            }
        })

    res.json('success')
})

const PORT = process.env.PORT || 3900
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})