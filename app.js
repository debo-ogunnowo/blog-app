require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use('/api', authRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
