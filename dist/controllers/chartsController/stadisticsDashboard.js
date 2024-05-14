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
exports.categoriasVentas = exports.MasVendidosP = exports.PagosProductos = exports.PagosCuotas = exports.PagosDelDia = exports.PorNivel_Mora = exports.PorNivel_Pendiente = exports.PorNivel_Pagado = exports.PorNiver_Alumnos = void 0;
const planPagos_1 = require("../../models/paymentsModels/planPagos");
const matricula_1 = require("../../models/paymentsModels/matricula");
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const pago_1 = require("../../models/pago");
const detallePago_1 = require("../../models/paymentsModels/detallePago");
const productos_1 = require("../../models/paymentsModels/productos");
const { Op } = require('sequelize');
const PorNiver_Alumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLevel } = req.params;
    if (idLevel === '0') {
        const list = yield matricula_1.registration.count({
            distinct: true,
        });
        res.json(list);
    }
    else {
        const list = yield matricula_1.registration.count({
            distinct: true,
            where: { id_level: idLevel }
        });
        res.json(list);
    }
});
exports.PorNiver_Alumnos = PorNiver_Alumnos;
const PorNivel_Pagado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLevel } = req.params;
    const year = new Date().getFullYear();
    if (idLevel === '0') {
        const list = yield planPagos_1.planPayment.findOne({
            attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'totalPagado']],
            where: {
                year: year,
                state: 1
            }
        });
        res.json(list);
    }
    else {
        const list = yield planPagos_1.planPayment.findOne({
            attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'totalPagado']],
            where: {
                id_level: idLevel,
                year: year,
                state: 1
            }
        });
        res.json(list);
    }
});
exports.PorNivel_Pagado = PorNivel_Pagado;
const PorNivel_Pendiente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLevel } = req.params;
    const year = new Date().getFullYear();
    if (idLevel === '0') {
        const list = yield planPagos_1.planPayment.findOne({
            attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'totalPendiente']],
            where: {
                year: year,
                state: 0
            }
        });
        res.json(list);
    }
    else {
        const list = yield planPagos_1.planPayment.findOne({
            attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'totalPendiente']],
            where: {
                id_level: idLevel,
                year: year,
                state: 0
            }
        });
        res.json(list);
    }
});
exports.PorNivel_Pendiente = PorNivel_Pendiente;
const PorNivel_Mora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLevel } = req.params;
    const year = new Date().getFullYear();
    const formattedDate = new Date().toISOString().split('T')[0];
    if (idLevel === '0') {
        const list = yield planPagos_1.planPayment.findAll({
            attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'Mora']],
            where: {
                year: year,
                dateExpiration: {
                    [Op.lt]: formattedDate
                },
                datePayment: {
                    [Op.or]: {
                        [Op.eq]: null
                    }
                }
            }
        });
        res.json(list);
    }
    else {
        const list = yield planPagos_1.planPayment.findAll({
            attributes: [[connection_1.default.fn('SUM', connection_1.default.col('price')), 'Mora']],
            where: {
                id_level: idLevel,
                year: year,
                dateExpiration: {
                    [Op.lt]: formattedDate
                },
                datePayment: {
                    [Op.or]: {
                        [Op.eq]: null
                    }
                }
            }
        });
        res.json(list);
    }
});
exports.PorNivel_Mora = PorNivel_Mora;
const PagosDelDia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield pago_1.payment.findAll({
        attributes: [
            [connection_1.default.fn('DATE', connection_1.default.col('datePayment')), 'payment_date'],
            [connection_1.default.fn('SUM', connection_1.default.col('totalAmount')), 'total_payment']
        ],
        group: [connection_1.default.fn('DATE', connection_1.default.col('datePayment'))],
        raw: true
    })
        .then((results) => {
        // Maneja los resultados aquí
        res.json(results);
    })
        .catch((error) => {
        console.error('Error al consultar la base de datos:', error);
    });
});
exports.PagosDelDia = PagosDelDia;
const PagosCuotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield planPagos_1.planPayment.findAll({
        attributes: [
            [connection_1.default.fn('DATE', connection_1.default.col('datePayment')), 'payment_date'],
            [connection_1.default.fn('SUM', connection_1.default.col('price')), 'total_payment']
        ],
        where: { state: 1 },
        group: [connection_1.default.fn('DATE', connection_1.default.col('datePayment'))],
        raw: true
    })
        .then((results) => {
        // Maneja los resultados aquí
        res.json(results);
    })
        .catch((error) => {
        console.error('Error al consultar la base de datos:', error);
    });
});
exports.PagosCuotas = PagosCuotas;
const PagosProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield detallePago_1.detailsPayment.findAll({
        attributes: [
            [connection_1.default.fn('DATE', connection_1.default.col('createdAt')), 'payment_date'],
            [connection_1.default.fn('SUM', connection_1.default.col('price')), 'total_payment']
        ],
        group: [connection_1.default.fn('DATE', connection_1.default.col('createdAt'))],
        raw: true
    })
        .then((results) => {
        // Maneja los resultados aquí
        res.json(results);
    })
        .catch((error) => {
        console.error('Error al consultar la base de datos:', error);
    });
});
exports.PagosProductos = PagosProductos;
const MasVendidosP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result1 = yield detallePago_1.detailsPayment.findAll({
            attributes: [
                [connection_1.default.fn('COUNT', connection_1.default.col('id_product')), 'cantidad'],
                [connection_1.default.col('product.nameProduct'), 'nombreProducto'],
            ],
            include: [
                {
                    model: productos_1.product,
                    attributes: [],
                },
            ],
            group: ['product.nameProduct', 'detailsPayment.id_product'],
        });
        const formattedResult = result1.map((row) => ({
            producto: row.getDataValue('nombreProducto'),
            cantidad: row.getDataValue('cantidad'),
        }));
        res.json(formattedResult);
    }
    catch (error) {
        console.error('Error al consultar datos:', error);
        res.status(500).json({ error: 'Error al consultar datos' });
    }
});
exports.MasVendidosP = MasVendidosP;
const categoriasVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.query(`
      SELECT c.nameCategory as categoria, count(d.id_product) as cantidad
      FROM detailspayments d
      INNER JOIN products p ON d.id_product = p.id
      INNER JOIN categories c ON c.id = p.id_category
      GROUP BY p.nameProduct, d.id_product;
    `, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error });
    }
});
exports.categoriasVentas = categoriasVentas;
