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
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno
dotenv_1.default.config();
// Configura el transporte de Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
const SendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, htmlContent } = req.body;
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html: htmlContent, // contenido del correo en HTML
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado', response: info.response });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.SendEmail = SendEmail;
