const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;