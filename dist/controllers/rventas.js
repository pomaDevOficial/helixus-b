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
exports.updateRVenta = exports.postRVenta = exports.deleteRVenta = exports.getRVenta = exports.getRVentas = void 0;
// import rventas from "../models/rventas";
const connection_1 = __importDefault(require("../db/connection"));
const getRVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listVentas = yield connection_1.default.ventas.findMany();
    res.json(listVentas);
});
exports.getRVentas = getRVentas;
const getRVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { RegistroID } = req.params;
    const rventa = yield connection_1.default.ventas.findFirst({ where: { VentaID: parseInt(RegistroID) } });
    if (rventa) {
        res.json(rventa);
    }
    else {
        res.status(404).json({
            msg: `No existe el rventa con el id ${RegistroID}`,
        });
    }
});
exports.getRVenta = getRVenta;
const deleteRVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { RegistroID } = req.params;
    const rventa = yield connection_1.default.ventas.findFirst({ where: { VentaID: parseInt(RegistroID) } });
    if (!rventa) {
        res.status(404).json({
            msg: `No existe el rventa con el id ${RegistroID}`,
        });
    }
    else {
        yield connection_1.default.ventas.delete({ where: {
                VentaID: rventa.VentaID
            } });
        res.json({
            msg: "El rventas fue eliminado con exito!",
        });
    }
});
exports.deleteRVenta = deleteRVenta;
const postRVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield connection_1.default.ventas.create(body);
        res.json({
            msg: `El rventas fue agregado con exito!`,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con Helixus soporte`,
        });
    }
});
exports.postRVenta = postRVenta;
const updateRVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { RegistroID } = req.params;
    try {
        const rventa = yield connection_1.default.ventas.findFirst({ where: { VentaID: parseInt(RegistroID) } });
        if (rventa) {
            yield connection_1.default.ventas.update({ where: { VentaID: rventa.VentaID }, data: body });
            res.json({
                msg: "El rventas fue actualziado con exito",
            });
        }
        else {
            res.status(404).json({
                msg: `No existe la marca con el id ${RegistroID}`,
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
exports.updateRVenta = updateRVenta;
