    const express = require('express')
       const bodyParser= require('body-parser')
       const app = express()

       app.use(bodyParser.urlencoded({extended: true}))
       app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
       const MongoClient = require('mongodb').MongoClient

           var db

       MongoClient.connect('mongodb-URI', (err, database) => {
             if (err) return console.log(err)
             db = database
             app.listen(3000, () => {
               console.log('listening on 3000')
             })
           })
       // All your handlers here...

       app.get('/', (req, res) => {
          db.collection('quotes').find().toArray((err, result) => {
            if (err) return console.log(err)
            // renders index.ejs
            res.render('index.ejs', {quotes: result})
          })
        })

        app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Tuvok'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

        app.post('/quotes', (req, res) => {
          db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/')
          })
        })

        app.delete('/quotes', (req, res) => {
          db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
            if (err) return res.send(500, err)
            res.send('A seven of nine quote got deleted')
          })
        })
