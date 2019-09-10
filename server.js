    const express = require('express')
       const bodyParser= require('body-parser')
       const app = express()

       app.use(bodyParser.urlencoded({extended: true}))

       // All your handlers here...

    app.listen(3000, function() {
      console.log('listening on 3000')
    })

    app.get('/', (req, res) => {
          res.sendFile(__dirname + '/index.html')
          // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
          // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
        })

        app.post('/quotes', (req, res) => {
              console.log(req.body)
            })
