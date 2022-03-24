const express = require('express');
const multer = require('multer')
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage })

app.use('/user', (req, res, next) => {
 res.render('forbidden.html');
})

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('project'), (req, res) => {

  const { author, sender, title, message } = req.body;

  if (author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, fileName: req.file.originalname });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});