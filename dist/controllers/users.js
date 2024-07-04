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
exports.updateUse = exports.postUse = exports.deleteUser = exports.getUse = exports.getuser = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
// import users from '../models/user';
const connection_1 = __importDefault(require("../db/connection"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Usuario, Password } = req.body;
    console.log(req);
    try {
        console.log(req);
        // Buscar al usuario en la base de datos por nombre de usuario
        const user = yield connection_1.default.usuarios.findFirst({
            where: { Usuario },
            include: { roles: true } // Incluir la relación con roles
        });
        // Si el usuario no existe, enviar un error
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        // const isMatch =  bcrypt.compareSync(Password, result.Password);
        const isMatch = Password === user.Password;
        // Si las contraseñas no coinciden, enviar un error
        if (!isMatch) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }
        // Crear un token de autenticación
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.idrol }, jwtConfig_1.jwtConfig.secret, { expiresIn: jwtConfig_1.jwtConfig.expiresIn });
        // Enviar el token como respuesta
        res.json({ token, id: user.userid, role: user.idrol });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error de servidor' });
    }
});
exports.login = login;
const getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield connection_1.default.usuarios.findMany();
    res.json(listUser);
});
exports.getuser = getuser;
const getUse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserID } = req.params;
    const use = yield connection_1.default.usuarios.findFirst({
        where: {
            userid: parseInt(UserID)
        }
    });
    if (use) {
        res.json(use);
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${UserID}`
        });
    }
});
exports.getUse = getUse;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = parseInt(id, 10); // Asegúrate de convertir el ID a número
    if (isNaN(userId)) {
        console.log('El ID del usuario no es válido:', userId); // Log para depuración
        res.status(400).json({ msg: 'El ID del usuario no es válido' });
        return;
    }
    try {
        const user = yield connection_1.default.usuarios.findFirst({
            where: {
                userid: userId
            }
        });
        if (!user) {
            console.log('No existe el usuario con el ID:', userId); // Log para depuración
            res.status(404).json({ msg: `No existe el usuario con el ID ${userId}` });
            return;
        }
        yield connection_1.default.usuarios.delete({
            where: {
                userid: userId
            }
        });
        res.json({ msg: 'El usuario fue eliminado con éxito', userName: user.Nombre });
    }
    catch (error) {
        console.error('Error al eliminar el usuario:', error); // Log para depuración
        res.status(500).json({ msg: 'Ocurrió un error al eliminar el usuario' });
    }
});
exports.deleteUser = deleteUser;
const postUse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield connection_1.default.usuarios.create({
            data: {
                Nombre: body.Nombre,
                Usuario: body.Usuario,
                Password: body.Password,
                Direccion: body.Direccion,
                idrol: body.idrol,
            },
        });
        res.json({
            msg: 'El usuario fue agregado con éxito!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Hubo un error al crear el usuario',
        });
    }
});
exports.postUse = postUse;
const updateUse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const use = yield connection_1.default.usuarios.findFirst({
            where: {
                userid: parseInt(id)
            }
        });
        if (use) {
            yield connection_1.default.usuarios.update({
                where: {
                    userid: parseInt(id)
                },
                data: body
            });
            res.json({
                msg: 'El usuario fue actualziado con exito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe el usuario con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con Helixus soporte`
        });
    }
});
exports.updateUse = updateUse;
