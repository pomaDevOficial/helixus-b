"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cierrecajas_1 = require("../controllers/cierrecajas");
const router = express_1.default.Router();
router.post('/cerrar-caja', cierrecajas_1.cerrarCaja);
router.get('/cierres-de-caja', cierrecajas_1.getCierresDeCaja);
router.get('/:cierreID/ventas', cierrecajas_1.getVentasPorCierreID); // Asegúrate de que esta ruta esté bien definida
router.get('/ventas-pendientes', cierrecajas_1.getVentasPendientes);
exports.default = router;
