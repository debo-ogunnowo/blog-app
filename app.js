require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const authMiddleware = require('./middleware/auth');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDb();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
  res.redirect('/api/login');
});
app.use('/api', authRouter);
app.use('/api', authMiddleware, postsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
