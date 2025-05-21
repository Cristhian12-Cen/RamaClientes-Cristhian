const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const Ciudad = require("./ciudad");
const Empresa = require("./empresa");
const TipoDocumento = require("./tipo_documento");
const TipoContribuyente = require("./tipo_contribuyente");

const Cliente = db.define('Cliente', {
    id_cliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    razon_social: { type: DataTypes.STRING(100), allowNull: false },
    numero_identificacion: { type: DataTypes.STRING(20), allowNull: false },
    direccion: { type: DataTypes.STRING(150), allowNull: true },
    telefono: { type: DataTypes.STRING(20), allowNull: true },
    correo: { type: DataTypes.STRING(100), allowNull: true },
    cuenta_local: { type: DataTypes.STRING(100), allowNull: true },
    cuenta_extranjera: { type: DataTypes.STRING(100), allowNull: true },
    estado: { type: DataTypes.BOOLEAN, allowNull: true },
    id_tipo_documento: { type: DataTypes.INTEGER, allowNull: false },
    id_tipo_contribuyente: { type: DataTypes.INTEGER, allowNull: false },
    id_ciudad: { type: DataTypes.INTEGER, allowNull: false },
    id_empresa: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true,
    tableName: 'cliente'
});

// Relaciones
Cliente.belongsTo(Ciudad, {
    foreignKey: 'id_ciudad'
});

Cliente.belongsTo(Empresa, {
    foreignKey: 'id_empresa'
});

Cliente.belongsTo(TipoDocumento, {
    foreignKey: 'id_tipo_documento'
});

Cliente.belongsTo(TipoContribuyente, {
    foreignKey: 'id_tipo_contribuyente'
});

module.exports = Cliente;