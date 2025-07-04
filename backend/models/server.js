const express = require('express');
const cors = require('cors');
const db = require('../db/connection');

const path =require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersR = '/api/usuarios';
        this.empresasR = '/api/empresas';
        this.autentificacionR = '/api/auth';
        this.rolesR = '/api/roles';
        this.periodosR = '/api/periodos';
        this.clientesR = '/api/cliente';
        this.ciudadesR = '/api/ciudades';
        this.tiposContribuyentesR = '/api/tipos_contribuyentes';
        this.tiposDocumentosR = '/api/tipos_documentos';
        this.dbConnection();
        this.middleware();

        this.routes();

        //FIXME: Todavia no mostre
       
       
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Base de Datos en linea");
        } catch (error) {
            throw new Error(error);
        }
    }

    middleware(){
        this.app.use( cors() );
        this.app.use( express.json() );
    }
       
    routes() {
        this.app.use(this.usersR, require('./../routes/users'));
        this.app.use(this.empresasR, require('./../routes/empresas'));
        this.app.use(this.autentificacionR, require('./../routes/auth'));
        this.app.use(this.rolesR, require('./../routes/roles'));
        this.app.use(this.periodosR, require('./../routes/periodos'));
        this.app.use(this.clientesR, require('./../routes/clientes'));
        this.app.use(this.ciudadesR, require('./../routes/ciudades'));
        this.app.use(this.tiposContribuyentesR, require('./../routes/tipos_contribuyentes'));
        this.app.use(this.tiposDocumentosR, require('./../routes/tipos_documentos'));
    }

    

    listen() {
        this.app.listen(this.port, () => { console.log(`Escuchando en: ${this.port}`); });
    }
}
module.exports = Server;