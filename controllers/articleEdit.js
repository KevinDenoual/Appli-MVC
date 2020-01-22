const Article = require('../database/models/Article')

module.exports = async (req, res) => {

   const dbArticle =  await Article.findById({ _id: req.params.id})


    res.render('edit', {
        dbArticle
    })

    }




    

