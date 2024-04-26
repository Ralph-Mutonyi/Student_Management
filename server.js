const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// define servers using app variable
const app = express();
const port = 3000;

// connect to db

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Ralphmutonyi#32',
    database : 'student_management_system'
});

// check if db is connected

db.connect((err) =>{
    // set up a condition
    if(err) throw err;
    console.log('Database connected');
})

// fetch the static files being used --> styling file and script file. 
/
app.use(express.static(__dirname));

// set up middleware to handle incoming JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

// 1st route , two params - request and response
app.post('/addStudent', (req, res) => {
    // Extract student data from the request body
    const {name, age, grade} = req.body;

    // SQL query to insert new student record into the database
    const sql = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';

    // Execute the SQL query with the student data

    db.query(sql, [name, age, grade], (err, result) => {
        if(err){
            console.error('Error adding student:', err);
            res.status(500).send('Error adding student to the database');
            return;
        }
        console.log('Student added succesfully');
        res.status(200).send('Student added succsesfully');
    });
});

app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

app.delete('/deleleStudent/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, id ,(err,result) => {
        if(err) throw err;
        res.send('Student deleted succesfully');
    });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});