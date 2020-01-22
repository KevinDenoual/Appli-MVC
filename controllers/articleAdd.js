module.exports = (req, res) => {

    if(req.session.userId) {
        return res.render('article/add')
    } else {
        res.redirect('/user/login')
    }
    
}

