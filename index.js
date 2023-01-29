 const { urlencoded } = require("express");
const express = require("express");
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');

const app = express();
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    Task.find({},function(err,tasks){
        if(err){
            console.log("Error in fetching the tasks");
            return;
        }
        return res.render('home',{
            title : "TODO List",
            task_list : tasks
        });
    });
});

app.post('/Add-task',function(req,res){
    Task.create({
        description : req.body.description,
        category : req.body.category,
        date : req.body.date
    },function(err,newTask){
        if(err){
            console.log("Error in adding a Task");
            return;
        }
        console.log("*****",newTask);
        return res.redirect('back');
    });
});


app.get('/delete-task',function(req,res){
    let iden = req.query.check;
    console.log(iden);

    for(let i = 0; i < iden.length; i++){
        console.log(iden[i]);
        Task.findByIdAndDelete({_id: iden[i]},function(err){   // AND WE CAN USE SIMPLE iden[i] HERE
            if(err){
                console.log("Error in deleting the task!");
            }else{
                console.log("task deleted successfully!");
            }
        });
    }
    return res.redirect('back');
});


app.listen(port,function(err){
    if(err){
        console.log("There is some error in running the server");
        return;
    }
    console.log(`Yup my express server is running on port : ${port}`);
})