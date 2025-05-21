const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const TipoContribuyente = db.define('TipoContribuyente', {
    id_contribuyente: { type: DataTypes.INTEGER, primaryKey: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'tipo_contribuyente'
});

module.exports = TipoContribuyente;