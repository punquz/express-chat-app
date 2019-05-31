exports.getGroup = (req, res, next) => {
    const {name} = req.params
    res.render('groupchat/group',{
        name
    })
}