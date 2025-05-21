const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { crearTablas } = require('./models/creacionTablas');
const router = require('./routes/rutes');

   
const dotenv = require('dotenv');
dotenv.config();

   
const app = express();
const PORT = 5600;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
//crear la tabla al iniciar el servidor
 (async ()=> {
    await crearTablas();
})();

app.use('/', router)

app.listen(PORT, () =>{
    console.log(`servidor corriendo en http://localhost:${PORT}`)
})