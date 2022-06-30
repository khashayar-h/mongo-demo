const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost')
.then(result => console.log('Connection Succesful...'))
.catch(err => console.log(err.message));

const courseSchema = mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ], 
    date : {type:Date, default: Date.now},
    isPublished : Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function saveCourse(){
    course = new Course({
        name: 'Good Movie',
        author: 'Khashayar',
        tags: ['tag1', 'tag2'],
        isPublished : true
    });
    
    const result = await course.save();
    console.log(result);
    
}

async function getCourse(){
    const course = await Course.find({author : "Khashayar", name :'Good Movie' })
    .sort({name : 1})
    .select({name : 1, tags : 1});
    console.log(course);

}

async function updateCourseQueryFirst(id){
    const course = await Course.findById(id);
    if(!course) return;
    
    course.isPublished = true;
    course.author = "";

    const result = await course.save();
    console.log(result);
}

async function updateCourseUpdateFirst(id){
    // result will keep a promise including the query result
    const result = await Course.updateOne({ _id : id}, {$set:{
        isPublished : false,
        author : ""
    }});
    console.log(result);
}

async function updateCourseUpdateFirst2(id){
    // course will keep a promise including the updated course
    const course = await Course.findByIdAndUpdate(id, {$set:{
        isPublished : false,
        author : ""
    }}, { new : true});
    console.log(course);
}

async function deleteCourse(id){
    // result will keep a promise including the query result
    const result = await Course.deleteOne({_id : id});
    console.log(result);
}

async function deleteCourse2(id){
    // course will keep a promise including the updated course
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

//saveCourse();
getCourse();