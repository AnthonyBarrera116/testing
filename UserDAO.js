const { Db } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 UserName: String,
 Email: String,
 Password: String,
 History: []
 },
 { collection : 'Users' });

 const userModel = mongoose.model('Users', userSchema);

 exports.create = async function(user){
    let duplicateU = await userModel.findOne({UserName: user.UserName});
    let duplicateE = await userModel.findOne({Email: user.Email});
    //console.log(user.UserName)
    //console.log(user.Email)
    //console.log(user.UserName)

    if(duplicateU != null){

        console.log("Username ")
        return 0;
        
    }

    if(duplicateE != null){

        console.log("eamil ")
        return 1;
        
    }

    else
    {
        const mongoUser = new userModel(user);
        await mongoUser.save();
        return await exports.read(mongoUser._id);
    }
    //Used the read function because in tests it kept returning the _id in the beginning rather than end

 }

 exports.read = async function(id){
    let user = await userModel.findById(id);
    return user;
}