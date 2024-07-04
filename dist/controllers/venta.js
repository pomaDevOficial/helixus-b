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
exports.getVentaBySerie = exports.getAllVentas = exports.getVentaPorID = exports.deleteVenta = exports.getVentas = exports.postVenta = void 0;
const connection_1 = __importDefault(require("../db/connection"));
// Ajusta la importación según tu configuración
const postVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendedorID, tipo, serie, numero, Fecha, Total, ClienteID, ventadetalle, } = req.body;
    try {
        const vendedorExists = yield connection_1.default.usuarios.findUnique({
            where: { userid: vendedorID }
        });
        if (!vendedorExists) {
            return res.status(400).json({ msg: 'El vendedor no existe' });
        }
        const nuevaVenta = yield connection_1.default.ventas.create({
            data: {
                vendedorID,
                tipo,
                serie,
                numero,
                Fecha,
                Total,
                ClienteID,
                // otros campos del vendedor...
            },
        });
        // Asegurarnos de que los detalles tengan los campos necesarios
        for (let index = 0; index < ventadetalle.length; index++) {
            const element = ventadetalle[index];
            yield connection_1.default.productos.update({
                where: { id: element.ProductoID },
                data: { Stock: { decrement: element.Cantidad } },
            });
            yield connection_1.default.ventadetalle.create({
                data: {
                    VentaID: nuevaVenta.VentaID,
                    ProductoID: element.ProductoID,
                    Cantidad: element.Cantidad,
                    PrecioUnitario: element.PrecioUnitario,
                    Subtotal: element.Subtotal,
                },
            });
        }
        // Actualizar el stock de los productos vendidos
        res.json({
            msg: "La venta fue agregada con éxito!",
            ventaID: nuevaVenta.VentaID,
        });
    }
    catch (error) {
        // await t.rollback();
        console.error(error);
        res.status(500).json({
            msg: "Upps ocurrió un error al agregar la venta, comuníquese con Helixus soporte",
        });
    }
});
exports.postVenta = postVenta;
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.query;
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    // Verificar que las fechas no sean undefined
    if (!startDate || !endDate) {
        return res
            .status(400)
            .json({ error: "Las fechas de inicio y fin son requeridas" });
    }
    try {
        // Convertir las fechas y asegurar que incluyan la zona horaria
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Ajustar la fecha final al final del día
        console.log("Parsed Start Date:", start.toISOString());
        console.log("Parsed End Date:", end.toISOString());
        // Verificar que las fechas sean válidas
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ error: "Formato de fecha inválido" });
        }
        const ventas = yield connection_1.default.ventas.findMany({
            where: {
                Fecha: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                usuarios: true,
                ventadetalle: true,
            },
            orderBy: {
                Fecha: "desc", // Ordenar por fecha de manera descendente
            },
        });
        console.log("Ventas Encontradas:", ventas);
        if (ventas.length === 0) {
            console.log("No se encontraron ventas en el rango de fechas especificado.");
        }
        res.json(ventas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las ventas" });
    }
});
exports.getVentas = getVentas;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Eliminar los detalles de la venta primero
        yield connection_1.default.ventadetalle.deleteMany({
            where: {
                VentaID: Number(id),
            },
        });
        // Luego eliminar la venta
        yield connection_1.default.ventas.delete({
            where: {
                VentaID: Number(id),
            },
        });
        res.json({
            msg: `La venta con ID ${id} fue eliminada con éxito!`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Upps ocurrió un error al eliminar la venta, comuníquese con Helixus soporte",
        });
    }
});
exports.deleteVenta = deleteVenta;
const getVentaPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Obtener la venta por ID
        const venta = yield connection_1.default.ventas.findUnique({
            where: {
                VentaID: Number(id),
            },
            include: {
                ventadetalle: {
                    include: {
                        productos: true, // Incluir detalles del producto
                    },
                },
                clientes: true, // Incluir detalles del cliente
            },
        });
        if (!venta) {
            return res.status(404).json({
                msg: "Venta no encontrada",
            });
        }
        res.json(venta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Upps ocurrió un error al obtener la venta, comuníquese con Helixus soporte",
        });
    }
});
exports.getVentaPorID = getVentaPorID;
// ...
const getAllVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield connection_1.default.ventas.findMany({
            include: {
                ventadetalle: {
                    include: {
                        productos: true
                    }
                }
            },
            orderBy: {
                Fecha: 'asc' // Ordenar por fecha ascendente
            }
        });
        res.json(ventas);
    }
    catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({
            msg: 'Error al obtener las ventas',
        });
    }
});
exports.getAllVentas = getAllVentas;
const getVentaBySerie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serie } = req.params;
    console.log(`Serie recibida en la solicitud: ${serie}`); // Log para verificar la serie recibida
    try {
        const venta = yield connection_1.default.ventas.findUnique({
            where: { serie },
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
        console.log(`Resultado de la consulta a la base de datos: ${JSON.stringify(venta)}`); // Log para verificar el resultado de la consulta
        if (venta) {
            res.json(venta);
        }
        else {
            res.status(404).json({ msg: `No se encontraron detalles de venta con la serie ${serie}` });
        }
    }
    catch (error) {
        console.error('Error al buscar detalles de venta por serie:', error);
        res.status(500).json({ msg: 'Error al buscar detalles de venta por serie', error });
    }
});
exports.getVentaBySerie = getVentaBySerie;
