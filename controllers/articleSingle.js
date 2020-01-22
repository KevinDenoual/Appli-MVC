// post
const post = require("../database/models/Article")

module.exports = async (req, res) => {

    const article = await post.findById(req.params.id)

    res.render('articles', { article })
}