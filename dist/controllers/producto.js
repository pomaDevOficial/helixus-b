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
exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getActiveProducts = exports.getProducts = exports.searchProduct = void 0;
// import Producto from '../models/producto';
const connection_1 = __importDefault(require("../db/connection"));
// Función de controlador para buscar productos por nombre
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.get;
    // Buscar productos que coincidan con el término de búsqueda en la base de datos
    const products = yield connection_1.default.productos.findMany({ where: {
            Nombre: {
                contains: searchTerm
            }
        } });
    // Enviar los resultados de vuelta al cliente
    res.json(products);
});
exports.searchProduct = searchProduct;
// Función de controlador para obtener todos los productos
// Función de controlador para obtener todos los productos activos
// Función de controlador para obtener todos los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield connection_1.default.productos.findMany();
    res.json(listProducts);
});
exports.getProducts = getProducts;
// Función de controlador para obtener productos activos para la venta
const getActiveProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activeProducts = yield connection_1.default.productos.findMany({
        where: {
            estado: true // Filtra solo productos activos
        }
    });
    res.json(activeProducts);
});
exports.getActiveProducts = getActiveProducts;
// Función de controlador para obtener un producto por su ID
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield connection_1.default.productos.findFirst({ where: {
            id: parseInt(id)
        } });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.getProduct = getProduct;
// Función de controlador para eliminar un producto por su ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield connection_1.default.productos.findFirst({ where: {
            id: parseInt(id)
        } });
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
    else {
        yield connection_1.default.productos.delete({ where: { id: product.id } });
        res.json({
            msg: 'El producto fue eliminado con exito!'
        });
    }
});
exports.deleteProduct = deleteProduct;
// Función de controlador para agregar un nuevo producto
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body } = req;
    try {
        yield connection_1.default.productos.create({
            data: {
                Barcode: body.Barcode,
                Nombre: body.Nombre,
                CategoriaID: body.CategoriaID,
                MarcaID: body.MarcaID,
                Medida: body.Medida,
                Stock: body.Stock,
                Pcosto: body.Pcosto,
                Pventa: body.Pventa,
                estado: (_a = body.estado) !== null && _a !== void 0 ? _a : true
            }
        });
        res.json({
            msg: `El producto fue agregado con exito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        });
    }
});
exports.postProduct = postProduct;
// Función de controlador para actualizar un producto por su ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const product = yield connection_1.default.productos.findFirst({
            where: {
                id: parseInt(id)
            }
        });
        if (product) {
            yield connection_1.default.productos.update({
                where: { id: product.id },
                data: Object.assign(Object.assign({}, body), { estado: body.estado // Asegúrate de incluir el campo estado
                 })
            });
            res.json({
                msg: 'El producto fue actualizado con exito'
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
exports.updateProduct = updateProduct;
