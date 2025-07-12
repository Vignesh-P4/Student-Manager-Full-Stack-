const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;


app.use(cors());//allow front end to connect
app.use(express.json());
let students = [{id:1,name:'boss',age:12}];

//Get all students 
app.get('/students', (req,res) =>{
    res.json(students);
});

//Post add new student
app.post('/students', (req,res)=> {
    const newStudent = {
        id:students.length+1,
        name:req.body.name,
        age:req.body.age,
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

//DELETE delete a student by id
app.delete('/students/:id', (req,res) => {
    const id = parseInt(req.params.id);
    students = students.filter((s)=> s.id !== id);
    res.send("Student with id ${id} deleted");
});


//PUT update a student by id
app.put('/students/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const {name,age} = req.body;
    const index = students.findIndex((s) => s.id === id);
    if(index !== -1){
        students[index] = {id,name,age};
        res.json({message:"Student updated",student:students[index]});
    }
    else{
        res.status(404).json({message:"Student not found"});
    }
});

app.listen(PORT , () =>{
    console.log(`server running on http://localhost:${PORT}`);
});