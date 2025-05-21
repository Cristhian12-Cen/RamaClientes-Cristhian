const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Ciudad = db.define('Ciudad', {
    id_ciudad: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
}, {
    createdAt: false,
    updatedAt: false,
    tableName: 'ciudad'
});

module.exports = Ciudad;