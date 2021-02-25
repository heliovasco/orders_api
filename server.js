const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const ordersRouter = require('./src/routes/order.routes');
const clientsRouter = require('./src/routes/client.routes');
app.use('/api', ordersRouter);
app.use('/api', clientsRouter);

app.use((req,res,next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

// Error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
     error: {
     status: error.status || 500,
     message: error.message || "Internal Server Error",
    },
   });
  });


app.listen(8080, ()=> {
    console.log('API using port 8080');
})
