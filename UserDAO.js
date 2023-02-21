const { Db } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 UserName: String,
 Email: String,
 Password: String,
 History: []
 },
 { collection : 'Users' });

 const userModel = mongoose.model('User', userSchema);

 exports.create = async function(user){
    let duplicateName = await userModel.find({UserName: user.UserName}).lean();
    let duplicateEmail = await userModel.find({Email: user.Email}).lean();

    console.log(user.UserName)
    console.log( user.Email)
    if(duplicateName.length > 0)
    {
        console.log("User \"" + user.UserName + "\" already exists");
        //console.log(JSON.stringify(duplicateName));
        if(duplicateEmail.length > 0)
        {
            console.log("Email: \"" + user.Email + "\" is already being used");
            //console.log(JSON.stringify(duplicateEmail));
        }
        return null;
    }
    else if(duplicateEmail.length > 0)
    {
        console.log("Email: \"" + user.Email + "\" is already being used");
        //console.log(JSON.stringify(duplicateEmail));
        return null;
    }
    else
    {
        const mongoUser = new userModel(user);
        await mongoUser.save();
        return await exports.readById(mongoUser._id);
    }
    //Used the read function because in tests it kept returning the _id in the beginning rather than end
 }