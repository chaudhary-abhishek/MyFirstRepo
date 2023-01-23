const express = require('express');
const app = express();
const path =require('path');
const methodOverride = require('method-override');
const { v4 : uuid } = require('uuid');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

var blogs = [
    {
        id : uuid(),
        title : "First Blog",
        body : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        author : "Murli"
    },
    {
        id : uuid(),
        title : "second Blog",
        body :  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        author : "Namita"
    },

]
//Displaying all the blogs
app.get('/blogs',(req,res)=>{
    //res.send("You have hit the root route");
    res.render('blogs/index',{blogs});
})

//To display form to create new blog
app.get('/blogs/new',(req,res)=>{
    res.render('blogs/new');
})

//adding new blog into the array of blogd
app.post('/blogs',(req,res)=>{
    //console.log(req.body);
    const {title,body,author} = req.body;
    
    blogs.push({id:uuid(),title,body,author});
    res.redirect('/blogs');
})

//To display a particular blog
app.get('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    //console.log(id);
    const foundedBlog = blogs.find(b=>b.id===id)
    //console.log(foundedBlog);
    res.render('blogs/show',{blog : foundedBlog});
})

//To edit a particular blog
app.get('/blogs/:id/edit',(req,res)=>{
    const {id} = req.params;
    const foundedBlog = blogs.find(b=>b.id===id)
    res.render('blogs/edit',{blog : foundedBlog})
})

//To get update the particular blog with edited body
app.patch('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    const foundedBlog = blogs.find(b=>b.id===id)
    //res.send("you hit the patch route");
    const updatedBody = req.body.body;
    foundedBlog.body = updatedBody;
    res.redirect('/blogs');

    //console.log(req.body);
})

//To delete a particular blog
app.delete('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    //const foundedBlog = blogs.find(b=>b.id===id)
    const newBlogs = blogs.filter(blog => {
        return blog.id !==id})
    blogs = newBlogs;
    res.redirect('/blogs/newBlog');  //Added a new route
})





app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})
