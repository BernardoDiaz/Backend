import { Request, Response } from 'express';
import { generatePDF } from '../../models/ReportsModel/generatePDF';

export const viewTicket = async(req:Request,res:Response) =>{
    const {id} = req.params
    try {
        const list = await generatePDF.findAll({
            attributes:['pdf'],
            where:{id_payment:id}
        });
        const pdf = list[0].pdf;
        const base64String = pdf.toString('base64');
        res.json(base64String);
    } catch (error) {
        res.status(500).json({msg:`Error al recuperar el pdf`});
    }
};
 

export const newTicket = async (req: Request, res: Response) => {

    const { pdf,id_payment } = req.body;
    try {
    // Convierte el PDF en base64 a un objeto Buffer
    let pdfBuffer = Buffer.from(pdf, 'base64');

    // Guarda el objeto Buffer en la base de datos
    await generatePDF.create({
      id_payment: id_payment,
      pdf: pdfBuffer
    });
    res.json({msg:`Exito`});
    console.log('PDF guardado en la base de datos');
    } catch (error) {
        res.json({
            msg: `Error al registrar el pdf`,
            error
        });
    } 
};
