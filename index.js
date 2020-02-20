const express = require('express');
const morgan = require('morgan');
const app = express();

// Settings
app.set('appName', 'Express Tutorial');
app.set('port', 3000);
app.set('view engine', 'ejs');

//middleware test
function logger(req, res, next) {
  console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

// middlewares
app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

// Routes
app.all('/user', (req, res, next) => {
  console.log('new request in /user');
  // res.send('finish');
  next();
});

app.get('/', (req, res) => {
  const users = [{ name: 'John', age: 21 }, { name: 'Jane', age: 32 }, { name: 'Hans', age: 45 }];
  res.render('index.ejs', { users: users });
});

app.get('/user', (req, res) => {
  res.json({
    name: 'John',
    lastname: 'Doe'
  });
});

app.post('/user/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.send('<h1>Create</h1>');
});

app.delete('/user/:userId', (req, res) => {
  res.send(`user ${req.params.userId} deleted`);
});

app.put('/user/:id', (req, res) => {
  res.send(`user ${req.params.id} updated`);
});

app.get('/about', (req, res) => {
  res.send('About me');
});

app.get('/contact', (req, res) => {
  res.send('Contact form');
});

app.get('/test', (req, res) => {
  res.send('<h1>Get</h1>');
});

app.post('/test', (req, res) => {
  res.send('<h1>Create</h1>');
});

app.put('/test', (req, res) => {
  res.send('<h1>Update</h1>');
});

app.delete('/test', (req, res) => {
  res.send('<h1>Delete</h1>');
});

app.use(express.static('public'));

// Start
app.listen(app.get('port'), () => {
  console.log(app.get('appName'));
  console.log(`Server on port ${app.get('port')}`);
});
