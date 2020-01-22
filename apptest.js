const mongoose = require('mongoose')
const Article = require('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test');

/*
Article.find({}, (error, articles) => {
    console.log(error, articles)
})
*/


/*
Article.create({
    title: "Avenger EndGame",
    intro: "test d'introduction",
    content: "Critique sur le film",
},  (error, post) => {
    console.log(error, post);
}

)
*/