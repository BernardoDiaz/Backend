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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTicket_other = exports.viewTicket_other = exports.newTicket = exports.viewTicket = void 0;
const generatePDF_1 = require("../../models/ReportsModel/generatePDF");
const othergeneratePDF_1 = require("../../models/ReportsModel/othergeneratePDF");
const viewTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield generatePDF_1.generatePDF.findAll({
            attributes: ['pdf'],
            where: { id_payment: id }
        });
        const pdf = list[0].pdf;
        const base64String = pdf.toString('base64');
        res.json(base64String);
    }
    catch (error) {
        res.status(500).json({ msg: `Error al recuperar el pdf` });
    }
});
exports.viewTicket = viewTicket;
const newTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pdf, id_payment } = req.body;
    try {
        // Convierte el PDF en base64 a un objeto Buffer
        let pdfBuffer = Buffer.from(pdf, 'base64');
        // Guarda el objeto Buffer en la base de datos
        yield generatePDF_1.generatePDF.create({
            id_payment: id_payment,
            pdf: pdfBuffer
        });
        res.json({ msg: `Exito` });
        console.log('PDF guardado en la base de datos');
    }
    catch (error) {
        res.json({
            msg: `Error al registrar el pdf`,
            error
        });
    }
});
exports.newTicket = newTicket;
const viewTicket_other = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield othergeneratePDF_1.other_generatePDF.findAll({
            attributes: ['pdf'],
            where: { id_other_payment: id }
        });
        const pdf = list[0].pdf;
        const base64String = pdf.toString('base64');
        res.json(base64String);
    }
    catch (error) {
        res.status(500).json({ msg: `Error al recuperar el pdf` });
    }
});
exports.viewTicket_other = viewTicket_other;
const newTicket_other = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pdf, id_other_payment } = req.body;
    try {
        // Convierte el PDF en base64 a un objeto Buffer
        let pdfBuffer = Buffer.from(pdf, 'base64');
        // Guarda el objeto Buffer en la base de datos
        yield othergeneratePDF_1.other_generatePDF.create({
            id_other_payment: id_other_payment,
            pdf: pdfBuffer
        });
        res.json({ msg: `Exito` });
        console.log('PDF guardado en la base de datos');
    }
    catch (error) {
        res.json({
            msg: `Error al registrar el pdf`,
            error
        });
    }
});
exports.newTicket_other = newTicket_other;
