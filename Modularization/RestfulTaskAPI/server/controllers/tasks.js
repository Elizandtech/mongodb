// const Task = require('../models/task.js');
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
    index: function(req, res) {
        console.log("GET /tasks");
        Task.find()
        .then(alltasks=> {res.json(alltasks); console.log('all tasks', alltasks);})
        .catch(err => res.json(err));
    },
    create: function(req, res) {
        console.log('POST /tasks');
        console.log('req body', req.body);
        const task = new Task(req.body);
        task.save()        
        .then(newtask => {
            console.log('newtask', newtask); 
            res.json({message: newtask.title + ' has been added', task: newtask});
        })
        .catch(err => res.json(err));
    },
    display: function(req, res) {
        console.log('GET /tasks/:id');
        const {id} = req.params;
        Task.findOne({_id: id})
        .then(gettask => {res.json(gettask); console.log('task is: ', gettask);})
        .catch(err => res.json(err));
    },
    update: function(req, res) {
        console.log('PUT /tasks/:id');
        const {id} = req.params;
        console.log("The task id requested is:", id);
        console.log('req body', req.body);
        Task.findById({_id: id})
        .then(updatetask => {
            updatetask.title = req.body.title;
            updatetask.description = req.body.description;
            updatetask.completed = req.body.completed;
            return updatetask.save();
        })
        .then(updatedtask => {console.log('updated task', updatedtask); res.json({message: 'Task has been updated', task: updatedtask});})
        .catch(err => res.json(err))
    },
    delete: function (req, res){
        console.log('DELETE /tasks/:id');
        const {id} = req.params;
        console.log("The task id requested is:", id);
        Task.findByIdAndDelete({_id: id})
        .then(deletedTask=> {res.json(deletedTask.title + ' has been removed'); console.log('deleted task 39', deletedTask );})
        .catch(err => res.json(err));
    }
};

