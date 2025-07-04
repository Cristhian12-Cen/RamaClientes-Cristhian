const Rol = require("../models/rol");
const Usuario = require("../models/usuario");
const Empresa = require("../models/empresa");
const Cliente = require("../models/cliente");
const Ciudad = require("../models/ciudad");
const TipoDocumento = require("../models/tipo_documento");
const TipoContribuyente = require("../models/tipo_contribuyente");
const { Op } = require('sequelize');

    
const existeRol = async (id_rol="")=>{
    console.log(`---------------------------------------- ${id_rol}`)
    const rol = await Rol.findByPk(id_rol);
    if(!rol){//error personalizado que va a ser capturado en el custom
        throw new Error(`El id ${id_rol} no existe en la bd`);
    }
}

const existePeriodo = async (idrol="")=>{
    console.log(`---------------------------------------- ${idrol}`)
    const rol = await Rol.findByPk(idrol);
    if(!rol){//error personalizado que va a ser capturado en el custom
        throw new Error(`El id ${idrol} no existe en la bd`);
    }
}

const existeCorreo = async (correo="")=>{
    const usuario = await Usuario.findOne({
        where:{correo}
    });

    if(usuario){//error personalizado que va a ser capturado en el custom
        throw new Error(`El correo ${correo} ya existe`);
    }
}

const existeUsuarioId = async (id="")=>{
    const usuario = await Usuario.findByPk(id);

    if(!usuario){//error personalizado que va a ser capturado en el custom
        throw new Error(`No existe usuario con id: ${id}`);
    }
}

const existeEmpresaId = async (id="")=>{
    const empresa = await Empresa.findByPk(id);

    if(!empresa){//error personalizado que va a ser capturado en el custom
        throw new Error(`No existe empresa con id: ${id}`);
    }
}

const existeClienteId = async (id="")=>{
    const cliente = await Cliente.findByPk(id);

    if(!cliente){//error personalizado que va a ser capturado en el custom
        throw new Error(`No existe cliente con id: ${id}`);
    }
}

const existeCiudadId = async (id="")=>{
    const ciudad = await Ciudad.findByPk(id);

    if(!ciudad){//error personalizado que va a ser capturado en el custom
        throw new Error(`No existe ciudad con id: ${id}`);
    }
}

const existeTipoDocumentoId = async (id="")=>{
    const tipoDocumento = await TipoDocumento.findByPk(id);

    if(!tipoDocumento){//error personalizado que va a ser capturado en el custom
        throw new Error(`No existe tipo de documento con id: ${id}`);
    }
}

const existeTipoContribuyenteId = async (id="")=>{
    const tipoContribuyente = await TipoContribuyente.findByPk(id);

    if(!tipoContribuyente){//error personalizado que va a ser capturado en el custom
        throw new Error(`No existe tipo de contribuyente con id: ${id}`);
    }
}

module.exports = {
    existeRol,
    existePeriodo,
    existeCorreo,
    existeUsuarioId,
    existeEmpresaId,
    existeClienteId,
    existeCiudadId,
    existeTipoDocumentoId,
    existeTipoContribuyenteId
}