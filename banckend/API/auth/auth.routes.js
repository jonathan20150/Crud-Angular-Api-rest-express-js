const Users = require('./auth.controller');
module.exports =(router)=>{
    router.post('/login',Users.loginUser);

}