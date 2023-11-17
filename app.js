const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose")

//conect to mongo db
const db_URI = "mongodb+srv://blog-user:blog-user@cluster0.lvzqcjf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_URI)
.then((results) => {
  // listen for requests
  app.listen(3000); 
})
.catch((err) => console.log(err))

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');




//midlewears
app.use(express.static("public"))
app.use(morgan("dev"))

//requests=====================================================================
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Ladi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Luka finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
//requests=====================================================================

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});