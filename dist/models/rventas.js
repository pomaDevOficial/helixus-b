"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const registrodeventas = connection_1.default.define('registrodeventas', {
    VentaID: {
        type: sequelize_1.DataTypes.STRING
    },
    Fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    Total: {
        type: sequelize_1.DataTypes.STRING
    },
    UsuarioID: {
        type: sequelize_1.DataTypes.STRING
    },
    tdocum: {
        type: sequelize_1.DataTypes.STRING
    },
    serie: {
        type: sequelize_1.DataTypes.STRING
    },
    numero: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false,
});
exports.default = registrodeventas;
