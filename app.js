import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import "@babel/polyfill";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3001

app.use(express.static(__dirname + '/src'))
app.get('/', (req, res) => res.sendFile('index.html'))
app.listen(port, () => console.log('App listening on port ' + port))