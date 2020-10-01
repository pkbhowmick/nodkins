const Joi = require('joi')
const {v4:uuidv4} = require('uuid')
const express = require('express');
const router = express.Router();

router.get('/api/tasks', (req,res)=>{
    res.send(taskList);
});

router.get('/api/tasks/:id',(req,res)=>{
    const task = taskList.find(c => c.id === req.params.id);
    if(!task) return res.status(404).send('Found no entry')

    return res.send(task);
})

router.post('/api/tasks',(req,res)=>{
    const {error} = validateBody(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const task = {
        id: uuidv4(),
        task: req.body.task
    };
    taskList.push(task);
    return res.send(task);
})

router.put('/api/tasks/:id',(req,res)=>{

    const {error} = validateBody(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const task = taskList.find(c => c.id === req.params.id);
    if(!task) return res.status(404).send('Found no entry');

    task.task = req.body.task;

    res.send(task);

})

router.delete('/api/tasks/:id',(req,res)=>{
    const task = taskList.find(c => c.id === req.params.id);
    if(!task) return res.status(404).send('Found no entry');

    const index = taskList.indexOf(task);
    taskList.splice(index,1);

    return res.send(task);
})

function validateBody(body) {
    const schema = Joi.object({
        task : Joi.string().required()
    });

    return schema.validate(body);
}

module.exports = router;