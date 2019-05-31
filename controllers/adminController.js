const mongoose = require('mongoose')
const Club = require('../models/club')
const formidable = require('formidable')



exports.getAdminDashboard = (req, res, next) => {
    res.render('admin/dashboard')
}

// exports.postUpload = (req, res, next) => {
    // const form = new formidable.IncomingForm();
    // // form.uploadDir = path.join(__dirname, '../public/uploads')
    // form.on('file', (field, file) => {
    //     // fs.rename(file.path, path.join(form.uploadDir, file.name), (err)=> {
    //     //     if(err) throw err;
    //     // })
    // });
    // form.on('error', (err) => {
    //     console.log(err)
    // })
    // form.on('end', () => {
    //     console.log("file uploaded successfully")
    // })
    // form.parse(req)
    // // res.redirect('admin/dashboard')
//     singleUpload(req, res, function(err){
//         return res.send({'imageUrl':req.file.location})
//     })

// }

//save data to database
exports.postSave = (req, res, next) => {
    const {club, country, upload1} = req.body
    console.log(club, country, upload1)
    const newClub = new Club({
        name: club,
        country,
        upload1
    })
    newClub
    .save()
    .then(c => {
        console.log(c)
        res.render('admin/dashboard')
    })
    .catch(err => console.log(err))
}