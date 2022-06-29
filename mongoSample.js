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
})

const Course = mongoose.model('Course', courseSchema);

async function saveCourse(){
    course = new Course({
        name: 'Good Movie',
        author: 'Khashayar',
        tags: ['tag1', 'tag2'],
        isPublished : true
    })
    
    const result = await course.save();
    console.log(result);
}

async function getCourse(){
    const course = await Course.find({author : "Khashayar", name :'Good Movie' })
    .sort({name : 1})
    .select({name : 1, tags : 1});
    console.log(course);

}

//saveCourse();
getCourse();