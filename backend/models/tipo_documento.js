const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const TipoDocumento = db.define('TipoDocumento', {
    id_tipo_documento: { type: DataTypes.INTEGER, primaryKey: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'tipo_documento'
});

module.exports = TipoDocumento;