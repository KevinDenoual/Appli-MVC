const Article = require("../database/models/Article")

module.exports = (req, res) => {
    const query = { _id: req.params.id }
    console.log(req.body)
    
    Article.findOneAndUpdate(
        query,
        {
            title: req.body.title,
            content: req.body.content
        },
        { useFindAndModify: false },
        function (error, post) {
            if (!error) res.redirect('back')
            res.redirect('/')
        }
    )
}