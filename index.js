const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
];
app.get('/', (req, res) =>{
    res.send('Hello World');

});

app.get('/api', (req, res) =>{
    res.send(courses);

});
app.get('/api/:id', (req,res) => {
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The given course with id ${req.params.id} was not found `)
    res.send(course)
});

app.put('/api/:id', (req,res) => {
    const course =courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The given course with id ${req.params.id} was not found `)

    const schema = {
        name : Joi.string().min(3).required()
    };

    const result= Joi.valid(req.body, schema);
    if (result.error) return res.status(400).send('Name us required and should be min of 4 chrac');

    course.name = req.body.name;
    res.send(course);
});

app.post('/api/', (req,res) => {
    const schema = {
        name : Joi.string().min(3).required()
    };

    const result= Joi.valid(req.body, schema);
    console.log(result);
    if (result.error) return res.status(400).send('Name us required and should be min of 3 chrac');

    const course = {
        id: courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course)
});

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Listening on port ${port}`))