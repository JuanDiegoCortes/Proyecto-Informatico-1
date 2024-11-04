// controllers/doctor.controller.js
import Diagnostic from '../models/diagnostic.model.js';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Configura el cliente de S3
const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

export const uploadDiagnosticVideo = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const doctorId = req.user.id; // 
        const originalFilePath = req.file.path; // Ruta temporal del archivo AVI en el servidor

        // Define la ruta de destino para el archivo MP4 temporal
        const mp4FilePath = path.join('uploads/videos/', `${path.parse(req.file.filename).name}.mp4`);

        // Convierte el archivo AVI a MP4
        ffmpeg(originalFilePath)
            .toFormat('mp4')
            .on('end', async () => {
                // Una vez convertido, lee el archivo MP4
                const fileStream = fs.createReadStream(mp4FilePath);

                // Configura los parámetros para la carga en S3
                const uploadParams = {
                    Bucket: AWS_BUCKET_NAME,
                    Key: `ecografias/${path.basename(mp4FilePath)}`,
                    Body: fileStream,
                    ContentType: 'video/mp4',
                };

                // Sube el archivo a S3
                s3.upload(uploadParams, async (error, data) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error al cargar el video en S3' });
                    }
                    // Guarda la URL de S3 en la base de datos
                    const diagnostic = new Diagnostic({
                        appointmentId,
                        doctorId,
                        diagnosis: req.body.diagnosis,
                        videoUrl: data.Location,
                    });

                    await diagnostic.save();

                    // Elimina archivos locales
                    fs.unlinkSync(originalFilePath);
                    fs.unlinkSync(mp4FilePath);

                    res.json({ message: 'Video subido a S3 y diagnóstico guardado exitosamente', diagnostic });
                });
            })
            .on('error', (error) => {
                res.status(500).json({ error: 'Error al convertir el video' });
            })
            .save(mp4FilePath); // Guarda el archivo MP4 temporalmente
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el diagnóstico y el video' });
    }
};
