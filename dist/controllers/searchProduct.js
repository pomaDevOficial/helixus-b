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
exports.searchProduct = void 0;
const producto_1 = __importDefault(require("../models/producto"));
// Función de controlador para buscar productos por nombre
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.get;
    try {
        // Buscar productos que coincidan con el término de búsqueda en la base de datos
        const products = yield producto_1.default.findAll({
            where: {
                Nombre: {
                    $like: `%${searchTerm}%`
                }
            }
        });
        // Enviar los resultados de vuelta al cliente
        res.json(products);
    }
    catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.searchProduct = searchProduct;
