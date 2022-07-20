require('./config/conexion');
const express = require('express');
const PORT = (process.env.PORT ||3050);

const app=express();

//admitir
//app.use(express.json);

//config
app.set('port',PORT);

//rutas
app.use('/api',require('./rutas'));


//iniciar expess
app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('error en server'+err);
    }else{
        console.log('server online success full ins port '+PORT);
    }
});