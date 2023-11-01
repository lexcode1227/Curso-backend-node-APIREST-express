const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 5000;

const whiteList = [  'http://127.0.0.1:8080', 'http://localhost:5000', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
//Middleware
app.use(express.json());

app.get('/api', (req, res)=> {
  res.send("Hola, mi primer servidor en express")
})

routerApi(app);

// Middleware de Error
// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=> {
  console.log("Mi puerto es " + port);
})
