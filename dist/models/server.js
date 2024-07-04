"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const producto_1 = __importDefault(require("../routes/producto"));
const categoria_1 = __importDefault(require("../routes/categoria"));
const user_1 = __importDefault(require("../routes/user"));
const marca_1 = __importDefault(require("../routes/marca"));
const morgan_1 = __importDefault(require("morgan"));
const roles_1 = __importDefault(require("../routes/roles"));
const cliente_1 = __importDefault(require("../routes/cliente"));
const cerrarcaja_1 = __importDefault(require("../routes/cerrarcaja"));
const rventa_1 = __importDefault(require("../routes/rventa"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        // this.dbConnect(); 
    }
    // Método para iniciar el servidor
    // Método para configurar las rutas de la aplicación
    routes() {
        // Ruta de prueba para verificar si la API está funcionando
        this.app.get('/', (req, res) => {
            res.json({ msg: 'API Working' });
        });
        // Monta las rutas relacionadas con los productos y categoria
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/user', user_1.default);
        this.app.use('/api/marcas', marca_1.default);
        this.app.use('/api/clientes', cliente_1.default);
        this.app.use('/api/categorias', categoria_1.default);
        this.app.use('/api/venta', rventa_1.default);
        this.app.use('/api/roles', roles_1.default);
        this.app.use('/api/cierrecaja', cerrarcaja_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    // Método para configurar los middlewares de la aplicación
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
    }
}
exports.default = Server;
