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
exports.updateCategor = exports.postCategor = exports.deleteCategoria = exports.getCategor = exports.getCategoria = void 0;
// import Categoria from '../models/categoria';
const connection_1 = __importDefault(require("../db/connection"));
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCategoria = yield connection_1.default.categorias.findMany();
    res.json(listCategoria);
});
exports.getCategoria = getCategoria;
const getCategor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categor = yield connection_1.default.categorias.findFirst({
        where: { id: parseInt(id) }
    });
    if (categor) {
        res.json(categor);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.getCategor = getCategor;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categor = yield connection_1.default.categorias.findFirst({
        where: { id: parseInt(id) }
    });
    if (!categor) {
        res.status(404).json({
            msg: `No existe la categoria con el id ${id}`
        });
    }
    else {
        yield connection_1.default.categorias.delete({ where: {
                id: parseInt(id)
            } });
        res.json({
            msg: 'la categoria fue eliminado con exito!'
        });
    }
});
exports.deleteCategoria = deleteCategoria;
const postCategor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield connection_1.default.categorias.create({
            data: {
                Nombre: body.Nombre,
            }
        });
        res.json({
            msg: `La categoria fue agregado con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con Helixus soporte`
        });
    }
});
exports.postCategor = postCategor;
const updateCategor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const categor = yield connection_1.default.categorias.findFirst({
            where: { id: parseInt(id) }
        });
        ;
        if (categor) {
            yield connection_1.default.categorias.update({
                where: { id: categor.id },
                data: body
            });
            res.json({
                msg: 'La categoria fue actualziado con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        });
    }
});
exports.updateCategor = updateCategor;
