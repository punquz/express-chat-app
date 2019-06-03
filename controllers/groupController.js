exports.getGroup = (req, res, next) => {
    const {name} = req.params
    res.render('groupchat/group',{
        groupName: name,
        user: req.user
    })
}