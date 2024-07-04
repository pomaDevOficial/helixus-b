"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCliente = exports.postCliente = exports.deleteCliente = exports.getCliente = exports.getClientes = void 0;
// import Clientes from "../models/cliente";
const connection_1 = __importDefault(require("../db/connection"));
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listClientes = yield connection_1.default.clientes.findMany();
    res.json(listClientes);
});
exports.getClientes = getClientes;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield connection_1.default.clientes.findFirst({ where: {
            id: parseInt(id)
        } });
    if (cliente) {
        res.json(cliente);
    }
    else {
        res.status(404).json({
            msg: `No existe el cliente con el id ${id}`,
        });
    }
});
exports.getCliente = getCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield connection_1.default.clientes.findFirst({ where: {
            id: parseInt(id)
        } });
    if (!cliente) {
        res.status(404).json({
            msg: `No existe el cliente con el id ${id}`,
        });
    }
    else {
        yield connection_1.default.clientes.delete({ where: {
                id: cliente.id
            } });
        res.json({
            msg: "el cliente fue eliminado con exito!",
        });
    }
});
exports.deleteCliente = deleteCliente;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { RucDni, Nombre, CorreoElectronico, Direccion, Telefono } = req.body;
    // console.log(req)
    try {
        // await Clientes.create({
        //   Nombre, CorreoElectronico, Direccion, Telefono, RucDni
        // });
        yield connection_1.default.clientes.create({
            data: {
                RucDni,
                Nombre,
                CorreoElectronico,
                Direccion,
                Telefono
            }
        });
        res.json({
            msg: `El cliente fue agregado con exito!`,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con Helixus soporte`,
        });
    }
});
exports.postCliente = postCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const cliente = yield connection_1.default.clientes.findFirst({ where: {
                id: parseInt(id)
            } });
        if (cliente) {
            yield connection_1.default.clientes.update({
                where: {
                    id: cliente.id
                }, data: body
            });
            res.json({
                msg: "El cliente fue actualziado con exito",
            });
        }
        else {
            res.status(404).json({
                msg: `No existe El cliente con el id ${id}`,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`,
        });
    }
});
exports.updateCliente = updateCliente;
