const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.use(express.static(__dirname + '/src'))
app.get('/', (req, res) => res.sendFile('index.html'))
app.listen(port, () => console.log('App listening on port ' + port))