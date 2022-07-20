require('./config/conexion');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secetre123456';
const bodyParser = require('body-parser');
const PORT = process.env.PORT ||3050;
const app=express();
const cors = require('cors');
const conexion = require('./config/conexion');



app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());






  //Rutas
app.get('/', (req, res) => {
    res.send('HOLA A LA API');
});

// listado de datos
app.get('/usuarios', verifytoken, (req, res) => {
    const sql='SELECT * FROM `usuarios`';
    conexion.query(sql, (error, results) => {
        if(error)throw error;
        if(results.length > 0){
            // res.json(results);

            jwt.verify(req.token,'secretkey',(err,authdata)=>{

                if(err){
                    res.sendStatus(403);
                }else{
                    res.json({
                        authdata,
                        results
                    });
                }

            });

        }else{
          res.send('No hay usuarios');  
        }
    });

});


// valisar si no a expirado el token
app.get('/validatetoken', verifytoken, (req, res) => {
    
            jwt.verify(req.token,'secretkey',(err,authdata)=>{

                if(err){
                    res.json(403);
                }else{
                    res.json({
                        authdata
                    });
                }

            });

    

});



// listado de datos
app.post('/login', (req, res) => {
    const {email,password}=req.body;
    const sql=`SELECT * FROM usuarios WHERE login='${email}' AND password='${password}' `;
    conexion.query(sql, (error, results) => {

        if(error)throw error;
        if(results.length > 0){

            jwt.sign({results},'secretkey',{expiresIn:'60s'},(err,token)=>{
                
                res.json({
                    token
                });
            });
        }else{
          res.send('No hay usuarios');  
        }



    });

});


//Authorization: Bearer <token>
function verifytoken(req,res,next){
        const bearerheader=req.headers['authorization'];
        
        if(typeof bearerheader!='undefined'){
                const bearertoken=bearerheader;
                req.token=bearertoken;
                next();
        }else{
            res.sendStatus(403);
        }
}


//listado por id
app.get('/login/:id', (req, res) => {
    const { id }=req.params;


    const sql=`SELECT * FROM usuarios WHERE idusuario= ${id}`;
    conexion.query(sql, (error, results) => {
        if(error)throw error;
        if(results.length > 0){
            res.json(results);
        }else{
          res.send('No hay usuarios');  
        }
    });

});

//Añadir un nuevo usuario
app.post('/add', (req, res) => {
    const sql='INSERT INTO cuenta SET ?';

    const usuarioObj = {
        nombre: req.body.nombre,
        Apellido: req.body.apellidos,
        apm: req.body.apm,
        usuario: req.body.usuario,
        password: req.body.password,
        correo: req.body.correo,    
        tipo: req.body.tipo

    };



    conexion.query(sql, usuarioObj, error =>{
        if(error) throw error;
        res.send('Usuario creado');
    });

    const expiresIn=24*60*60;
    const accessToken = jwt.sign({})

});

//actualizar usuario
app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {nombre,apellidos,apm,usuario,password,correo,tipo}=req.body;
    const sql=`UPDATE cuenta SET Nombre='${nombre}',Apellido='${apellidos}',apm='${apm}',Usuario='${usuario}',Password='${password}',Correo='${correo}',tipo='${tipo}' WHERE idcuen= ${id}`;

    conexion.query(sql, error =>{
        if(error) throw error;
        res.send('Usuario Actualizado');
    });
   
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `delete from usuarios where idusuario=${id}`;
    conexion.query(sql, error =>{
        if(error) throw error;
        res.send('Usuario Eliminado');
    });
});

  

  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));