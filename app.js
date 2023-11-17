const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose")
const blogRoutes = require("./routes/blogRoutes")

// express app
const app = express();

//conect to mongo db
const db_URI = "mongodb+srv://blog-user:blog-user@cluster0.lvzqcjf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_URI)
.then((results) => {
  // listen for requests
  app.listen(3000); 
})
.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

//midlewears & static files
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))



//routes=====================================================================
//blog routes
app.use("/blogs", blogRoutes)


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//routes=====================================================================

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});