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
exports.getVentasPendientes = exports.getVentasPorCierreID = exports.getCierresDeCaja = exports.cerrarCaja = void 0;
// import Marcas from "../models/marca";
const connection_1 = __importDefault(require("../db/connection"));
const cerrarCaja = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { almacen, turno, usuarioID, ventas } = req.body;
    try {
        // Crear un nuevo registro en la tabla caja
        const cierre = yield connection_1.default.caja.create({
            data: {
                Almacen: almacen,
                Turno: turno,
                UsuarioID: usuarioID,
                Fecha: new Date()
            }
        });
        // Asociar ventas con el cierre de caja
        for (const ventaID of ventas) {
            yield connection_1.default.cajaventas.create({
                data: {
                    CajaID: cierre.CajaID,
                    VentaID: ventaID
                }
            });
        }
        res.json({ msg: 'Cierre de caja realizado con éxito!', cierreID: cierre.CajaID });
    }
    catch (error) {
        console.error('Error al cerrar la caja:', error);
        res.status(500).json({ msg: 'Error al cerrar la caja' });
    }
});
exports.cerrarCaja = cerrarCaja;
const getCierresDeCaja = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cierres = yield connection_1.default.caja.findMany({
            orderBy: {
                Fecha: 'desc'
            },
            include: {
                cajaventas: {
                    include: {
                        ventas: {
                            include: {
                                ventadetalle: {
                                    include: {
                                        productos: true
                                    }
                                },
                                clientes: true,
                                tipodepago: true
                            }
                        }
                    }
                },
                usuarios: true
            }
        });
        res.json(cierres);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los cierres de caja' });
    }
});
exports.getCierresDeCaja = getCierresDeCaja;
const getVentasPorCierreID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cierreID } = req.params;
    console.log(`ID del cierre recibido: ${cierreID}`); // Verifica el ID recibido
    try {
        const ventas = yield connection_1.default.ventas.findMany({
            where: {
                cajaventas: {
                    some: {
                        CajaID: Number(cierreID)
                    }
                }
            },
            include: {
                ventadetalle: {
                    include: {
                        productos: true
                    }
                },
                clientes: true,
                usuarios: true,
            }
        });
        if (!ventas) {
            return res.status(404).json({
                msg: "No se encontraron ventas para el cierre de caja especificado",
            });
        }
        console.log(`Ventas encontradas: ${JSON.stringify(ventas)}`); // Verifica las ventas encontradas
        res.json(ventas);
    }
    catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({
            msg: "Error al obtener las ventas para el cierre de caja especificado",
        });
    }
});
exports.getVentasPorCierreID = getVentasPorCierreID;
const getVentasPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventasPendientes = yield connection_1.default.ventas.findMany({
            where: {
                cajaventas: {
                    none: {}
                }
            },
            include: {
                ventadetalle: {
                    include: {
                        productos: true
                    }
                }
            }
        });
        res.json(ventasPendientes);
    }
    catch (error) {
        console.error('Error al obtener las ventas pendientes:', error);
        res.status(500).json({ msg: 'Error al obtener las ventas pendientes' });
    }
});
exports.getVentasPendientes = getVentasPendientes;
