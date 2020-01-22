const Article = require("../database/models/Article")

module.exports = (req, res) => {
    const query = {_id: req.params.id}

    console.log(req.body);

    Article.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error) => {
        if (error) {
            res.redirect('/article/edit');
        } else {
            res.redirect('/')
        }
    })
}