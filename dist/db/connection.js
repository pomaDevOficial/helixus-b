"use strict";
// import { Sequelize } from 'sequelize';
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelize = new Sequelize('backenhelixus', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });
//   export default sequelize;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
