const mongo = require('mongodb')
const express = require('express')
const app = express()
app.use(express.json())

taskList = [
]

const taskRouter = require("./routes/task")

app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
})

app.use(taskRouter);



app.get('/', (req,res) =>{
    res.send('Hello world!');
});



const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening on port ${port}`));

module.exports = app;