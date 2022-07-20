const route = require('express').Router();
const conexion=require('./config/conexion');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

//parse
route.use(bodyParser.json());

//cors
route.use(cors({
    origin: '*'
}));



//funcion para verificar token creado
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

// rutas

//login y creacion de json web token
route.post('/login', (req, res) => {
    const {email,password}=req.body;
    const sql=`SELECT * FROM usuarios WHERE login='${email}' AND password='${password}' `;
    conexion.query(sql, (error, results) => {

        if(error)throw error;
        if(results.length > 0){

            jwt.sign({results},'secretkey',{expiresIn:'1h'},(err,token)=>{                
                res.json({
                    token
                });
            });
        }else{
          res.send('No hay usuarios');  
        }



    });

});

// validar si no a expirado el token
route.get('/validatetoken', verifytoken, (req, res) => {
    
    jwt.verify(req.token,'secretkey',(err,authdata)=>{

        if(err){
            res.json(403);
        }else{
            res.json({authdata});
        }

    });



});

//listado de materiales o productos
route.get('/list_materiales/:id_proveedor', verifytoken, (req, res) => {
    
    const { id_proveedor }=req.params;
    jwt.verify(req.token,'secretkey',(err,authdata)=>{

        if(err){
            res.sendStatus(403);
        }else{
            const sql=`SELECT * FROM materiales WHERE id_proveedor= ${id_proveedor}`;

            conexion.query(sql,(err,rows, fields)=>{
                if(err) throw err;
                else{
                    res.json(rows);
                }
            });
            // conexion.query(sql, (error, results) => {
            //     if(error)throw error;
            //     if(results.length > 0){
            //         res.json({
            //             results
            //         });            
            //     }else{
            //       res.send('No hay usuarios');  
            //     }
            // });
        }

    });



});

//listar 1 material

//listado por id
route.get('/materiales/:id',verifytoken, (req, res) => {
    const { id }=req.params;
    const sql=`SELECT * FROM materiales WHERE id= ${id}`;

    jwt.verify(req.token,'secretkey',(err,authdata)=>{

        
        if(err){
            res.sendStatus(403);
        }else{
            conexion.query(sql,(err,rows, fields)=>{
                if(err) throw err;
                else{
                    res.json(rows);
                }
            });

            // conexion.query(sql, (error, results) => {
            //     if(error)throw error;
            //     if(results.length > 0){
            //         res.json(results);
            //     }else{
            //       res.send('No hay usuarios');  
            //     }
            // });

            
        }

    });

});

//Añadir un nuevo material
route.post('/add/:id_proveedor',verifytoken, (req, res) => {
    const { id_proveedor }=req.params;
    const{nombre,descripcion}=req.body;
    const sql=`insert into materiales(id_proveedor,nombre,descripcion) values('${id_proveedor}','${nombre}','${descripcion}')`
    
    jwt.verify(req.token,'secretkey',(err,authdata)=>{

        if(err){
            res.sendStatus(403);
        }else{
            conexion.query(sql, (error, results) => {
                if(error) throw error;
                res.send('200');
            });
        }

    });
    
    

});

//elminar material
route.delete('/eliminar/:id',verifytoken, (req, res) => {
    const {id} = req.params;
    const sql = `delete from materiales where id=${id}`;

    jwt.verify(req.token,'secretkey',(err,authdata)=>{

        if(err){
            res.sendStatus(403);
        }else{
            conexion.query(sql, error =>{
                if(error) throw error;
                res.json({status:'deleted'});
            });
        }
    });
});

//actualizar material
route.put('/update/:id',verifytoken, (req, res) => {
    const {id} = req.params;
    const {nombre,descripcion}=req.body;
    const sql=`UPDATE materiales SET nombre='${nombre}',descripcion='${descripcion}' WHERE id= ${id}`;

    jwt.verify(req.token,'secretkey',(err,authdata)=>{

        if(err){
            res.sendStatus(403);
        }else{
            conexion.query(sql, error =>{
                if(error) throw error;
                res.json(200);
            });
        }
    });



   
});



module.exports=route;