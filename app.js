const express = require('express')
const mongoose = require('mongoose')
const measuresRoutes = require('./routes/measures.route.js')
const path = require('path');

require('dotenv').config();


const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//handle js files
app.use((req, res, next) => {
    if (req.path.endsWith('.js') && !req.path.includes('app.js')) {
        res.type('application/javascript');
    }
    next();
});

const PROD_URL = process.env.PROD_URL;
const LOCAl_URL = process.env.LOCAL_URL;
console.log('PROD URL:', PROD_URL);
//routes
app.use(`/api/measures`, measuresRoutes);

console.log(path.join(__dirname, 'public', 'index.html'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}
);
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to the database!');
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((error) => console.log('Connection failed!', error));


const corsOptions = {
    origin: PROD_URL || LOCAl_URL,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
