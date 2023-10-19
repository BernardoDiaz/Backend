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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../models/usersModels/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Metodo para crear nuevo usuario
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, rol } = req.body;
    //Validacion de usuario
    const uservalid = yield user_1.user.findOne({ where: { username: username } });
    if (uservalid) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    //Encriptacion de la password
    const hastpassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Guardando usuario en base de datos
        yield user_1.user.create({
            username: username,
            password: hastpassword,
            rol: rol
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente con el rol de ${rol}`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newUser = newUser;
//Metodo de loggin para usuarios y generacion de token
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, rol } = req.body;
    //validar si el usuario existe en bd
    const uservalidlog = yield user_1.user.findOne({ where: { username: username } });
    //Si el user no existe
    if (!uservalidlog) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} registrado`
        });
    }
    //Validamos password
    const passwordvalid = yield bcrypt_1.default.compare(password, uservalidlog.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: `Tu contraseña no es correcta, intenta nuevamente`
        });
    }
    //Si todo se cumplio vamos a la Generacion de token jwt 
    const token = jsonwebtoken_1.default.sign({
        username: username,
    }, process.env.SECRET_KEY || '6KgpWr@TtNW4LKMKC5J8o6b6F');
    //Devolvemos el token como respuesta via JSON
    res.json(token);
});
exports.loginUser = loginUser;
