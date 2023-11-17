const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose")
const Blog = require('./models/blog');

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
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.post("/blogs", ((req,res) => {
  const blog =  new Blog(req.body)
  blog.save()
  .then(() => {
    res.redirect("/blogs")
  })
  .catch((err)=>console.log(err))
}))

app.get("/blogs/:id", (req,res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details",{blog: result, title: "Blog Details"})
    })
    .catch((err)=>console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
//routes=====================================================================

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});