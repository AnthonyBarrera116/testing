const { Db } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 UserName: String,
 Password: String,
 History: []
 },
 { collection : 'Users' });

 const userModel = mongoose.model('Users', userSchema);

 exports.create = async function(user){
    let duplicateU = await userModel.findOne({Email: user.Email});
    //console.log(user.UserName)
    //console.log(user.Email)
    //console.log(user.UserName)

    if(duplicateU != null){

        console.log("Email ")
        return 0;
        
    }

    else
    {
        const mongoUser = new userModel(user);
        await mongoUser.save();
        return await exports.findOne(mongoUser._id);
    }
    //Used the read function because in tests it kept returning the _id in the beginning rather than end

 }

 exports.findOne = async function(id){
    let user = await userModel.findById(id);
    return user;
}