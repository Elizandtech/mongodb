const task = require('../controllers/tasks.js');

module.exports = function(app) {
app.get('/tasks', (req, res)=>{
    task.index(req,res);
})

app.get('/tasks/:id', (req, res)=>{
    task.display(req, res);
})

app.post('/tasks', (req, res)=>{
    task.create(req, res);
})

app.put('/tasks/:id', (req, res)=> {
    task.update(req, res);
})

app.delete('/tasks/:id', (req, res)=>{
    task.delete(req, res);
})
};