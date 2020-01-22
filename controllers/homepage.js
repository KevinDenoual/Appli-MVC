// post
const post = require("../database/models/Article")

module.exports =  async (req, res) => {

    const posts = await (await post.find({}))    

    console.log(req.session);

    res.render('index', { posts })

}