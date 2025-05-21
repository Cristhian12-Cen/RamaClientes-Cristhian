const Cliente = require("../models/cliente");
const { Op } = require('sequelize');
const Ciudad = require("../models/ciudad");
const Empresa = require("../models/empresa");
const TipoDocumento = require("../models/tipo_documento");
const TipoContribuyente = require("../models/tipo_contribuyente");

const getIdController = async (req, res) => {
    try {
        let idCliente = req.params.id;
        let cliente = await Cliente.findOne({
            attributes: ['id_cliente', 'razon_social', 'numero_identificacion', 'direccion', 'telefono', 'correo', 'cuenta_local', 'cuenta_extranjera', 'estado', 'createdAt', 'updatedAt'],
            where: {
                id_cliente: idCliente
            },
            include: [
                {
                    model: Ciudad,
                    attributes: ['nombre']
                },
                {
                    model: Empresa,
                    attributes: ['nombre']
                },
                {
                    model: TipoDocumento,
                    attributes: ['descripcion']
                },
                {
                    model: TipoContribuyente,
                    attributes: ['descripcion']
                }
            ]
        });
        console.log(cliente);
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador 1' });
    }
}

const getController = async (req, res) => {
    let { desde, limite } = req.query;

    try {
        limite = parseInt(limite);
        desde = parseInt(desde);
        let clientes, total;
        if (desde > -1 && limite > 0) {
            [total, clientes] = await Promise.all([
                Cliente.count(),
                Cliente.findAll({
                    where: {estado: true},
                    offset: desde,
                    limit: limite,
                    attributes: ['id_cliente', 'razon_social', 'numero_identificacion', 'direccion', 'telefono', 'correo', 'cuenta_local', 'cuenta_extranjera', 'estado', 'createdAt', 'updatedAt'],
                })
            ]);
        } else {
            [total, clientes] = await Promise.all([
                Cliente.count(),
                Cliente.findAll({
                    where: {estado: true},
                    attributes: ['id_cliente', 'razon_social', 'numero_identificacion', 'direccion', 'telefono', 'correo', 'cuenta_local', 'cuenta_extranjera', 'estado', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: Ciudad,
                            attributes: ['nombre']
                        },
                        {
                            model: Empresa,
                            attributes: ['nombre']
                        },
                        {
                            model: TipoDocumento,
                            attributes: ['descripcion']
                        },
                        {
                            model: TipoContribuyente,
                            attributes: ['descripcion']
                        }
                    ]
                })
            ]);
        }

        res.json({ total, clientes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador 2' });
    }
}

const postController = async (req, res) => {
    const { estado, ...body } = req.body;
    try {
        const cliente = new Cliente(body);
        await cliente.save();
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
}

const putController = async (req, res) => {
    const { id } = req.params;
    const { estado, ...body } = req.body;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ msg: `No existe el cliente con id ${id}` });
        }
        await cliente.update(body);
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
}

const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ msg: `No existe el cliente con id ${id}` });
        }
        await cliente.update({ estado: false });
        res.json({ mensaje: "Cliente eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
}

module.exports = {
    getController,
    postController,
    putController,
    deleteController,
    getIdController
}