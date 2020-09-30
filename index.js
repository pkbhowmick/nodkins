const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

taskList = [
    {id:1,task:'task1'},
    {id:2,task:'task2'}
]

app.get('/', (req,res) =>{
    res.send('Hello world!');
});


app.get('/api/tasks', (req,res)=>{
    res.send(taskList);
});

app.get('/api/tasks/:id',(req,res)=>{
    const task = taskList.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Found no entry')

    return res.send(task);
})

app.post('/api/tasks',(req,res)=>{
    const {error} = validateBody(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const task = {
        id: taskList.length+1,
        task: req.body.task
    };
    taskList.push(task);
    return res.send(task);
})

app.put('/api/tasks/:id',(req,res)=>{

    const {error} = validateBody(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const task = taskList.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Found no entry');

    task.task = req.body.task;

    res.send(task);

})

app.delete('/api/tasks/:id',(req,res)=>{

})

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening on port ${port}`));

function validateBody(body) {
    const schema = Joi.object({
        task : Joi.string().required()
    });

    return schema.validate(body);
}