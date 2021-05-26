const express = require('express');
const mysql = require('mysql');

//CREATE DB CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'shocker',
    password: '<insertyourpwd>',
    database: 'nodemysql'
});

//CONNECT TO DATABASE
db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('MySQL connected');
})

const app = express();
app.use(express.json());

//CREATE DATABASE
app.get('/createDB', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Database Created');
    })
})

//CREATE TABLE
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Posts table created...');
    })
})

//INSERT POST
app.post('/addpost', (req, res) => {
    // let post = {
    //     title: 'Post 1',
    //     body: 'This is post 1'
    // }
    console.log('Endpoint active');
    let post = req.body;
    console.log(post);
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Post created');
    }); 
});

//GET ALL POSTS
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err;
        }
        console.log(results);
        res.send('Results fetched');
    })
})

//GET SINGLE POST
app.get('/getpost/:id', (req, res) => {
    let sql = 'SELECT * FROM posts WHERE id = '+req.params.id;
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Post fetched');
    })
})

//UPDATE POST
app.patch('/updatepost/:id', (req, res) => {
    let newTitle = req.body.title;
    let sql = 'UPDATE posts SET title = "'+newTitle+'" WHERE id = '+req.params.id;
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('post updated')
    })
})

//DELETE POST
app.delete('/deletepost/:id', (req, res) => {
    let sql = 'DELETE FROM posts WHERE ID = '+req.params.id;
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Post deleted');
    })
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server started on port '+PORT);
})