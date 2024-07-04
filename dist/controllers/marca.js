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
exports.updateMarca = exports.postMarca = exports.deleteMarca = exports.getMarca = exports.getMarcas = void 0;
// import Marcas from "../models/marca";
const connection_1 = __importDefault(require("../db/connection"));
const getMarcas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMarcas = yield connection_1.default.marcas.findMany();
    res.json(listMarcas);
});
exports.getMarcas = getMarcas;
const getMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const marca = yield connection_1.default.marcas.findFirst({ where: { id: parseInt(id) } });
    if (marca) {
        res.json(marca);
    }
    else {
        res.status(404).json({
            msg: `No existe la marca con el id ${id}`,
        });
    }
});
exports.getMarca = getMarca;
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield connection_1.default.marcas.findFirst({ where: { id: parseInt(id) } });
        if (!marca) {
            res.status(404).json({
                msg: `No existe la marca con el id ${id}`,
            });
        }
        else {
            yield connection_1.default.marcas.delete({ where: { id: parseInt(id) } });
            res.json({
                msg: "La marca fue eliminada con éxito!",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al eliminar la marca, comuníquese con el soporte",
        });
    }
});
exports.deleteMarca = deleteMarca;
const postMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield connection_1.default.marcas.create({
            data: {
                Nombre: body.Nombre,
            }
        });
        res.json({
            msg: `La marca fue agregado con exito!`,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con Helixus soporte`,
        });
    }
});
exports.postMarca = postMarca;
const updateMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const marca = yield connection_1.default.marcas.findFirst({ where: { id: parseInt(id) } });
        if (marca) {
            yield connection_1.default.marcas.update({
                where: { id: marca.id },
                data: body,
            });
            res.json({
                msg: "La marca fue actualziado con exito",
            });
        }
        else {
            res.status(404).json({
                msg: `No existe la marca con el id ${id}`,
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
exports.updateMarca = updateMarca;
