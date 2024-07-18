const express = require('express')
const mongoose = require('mongoose')
const Measures = require('./models/measures.model.js')
const measuresRoutes = require('./routes/measures.route.js')
require('dotenv').config();

const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');


//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
\

//routes
app.use("/api/measures", measuresRoutes);

const PORT = process.env.PORT;
const PROD_URI = process.env.PROD_URI;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to the database!');
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((error) => console.log('Connection failed!', error));

const corsOptions = {
    origin: PROD_URI,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
