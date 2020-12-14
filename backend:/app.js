require('dotenv').config(); 
const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger'); 
const { validateUser, validateLogin } = require('./middlewares/requestValidation');
const NotFoundError = require('./errors/NotFoundError.js');

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});