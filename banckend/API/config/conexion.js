const mysql = require('mysql');

const conexion = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'compras'
  });

  conexion.connect((err)=>{
    if(err){
        console.log('error de conexion '+err);
    }else{
        console.log('bd success');
    }
  });

  module.exports=conexion;