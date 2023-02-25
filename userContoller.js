let dao = require("./UserDAO");
//const passUtil = require('../Util/PasswordUtil');
//let dao = require("./MockUserDao");

exports.setDao = function(otherDao)
{
    dao = otherDao;
}

exports.create = async function(request, response)
{
    // creating a new User Object to be sent to the DAO
    // shares the exact same fields as a user in the DAO
    
    //console.log("i\'m running this from the controller!");
    //console.log( JSON.stringify(request.body) );
    
    // extract individual elements, hash Password
    let username = request.body.username;
    let password = request.body.password;
    
    // building the user based on the info from the request
    let user = 
    {
        UserName: username,
        Password: password,
        History: [],
    };

    // creating the user with the dao. if the user already exists, the dao returns 'null', else it returns the user
    let returnedUser = await dao.create( user );

    // if we get a user, send their information minus their Password
    if (returnedUser != 0 || returnedUser != 1)
    {
        returnedUser.Password = null; // set the Password to 'null' for security
        
        // send 200 status, indicating we connected
        response.status(200);
        
        // send user information back to the app
        
    }
    // if we get null, send back null
    else
    {
        response.status(500);

    }
}