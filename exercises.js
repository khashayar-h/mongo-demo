const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const { resourceLimits } = require('worker_threads');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(result=>console.log('Connection Successful...'))
.catch(err => console.log(err.message));

const courseSchema = mongoose.Schema({
    tags : [ String ],
    date : {type : Date, default : Date.now()},
    name : String,
    author : String,
    isPublished : Boolean,
    price : Number
});

const Course = mongoose.model('courses', courseSchema);

async function getCourses(){
    const result = await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({name : 1})
    .select({name : 1, author : 1});

    console.log(result);
}

async function getCoursesByPrice(){
    const result = await Course
    .find({ isPublished: true })
    .or([{tags: 'backend'} , {tags: 'frontend'}])
    .sort({price : -1})
    .select({name : 1, author : 1});

    console.log(result);
}

async function getCoursesByPrice2(){
    const result = await Course
    .find({ isPublished: true })
    .or([{price: {$gte:15}}, 
        {name: /.*by.*/i}]);
    console.log(result);
}


//getCourses();
//getCoursesByPrice();
getCoursesByPrice2();

