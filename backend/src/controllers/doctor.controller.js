import Diagnostic from '../models/diagnostic.model.js';
import Appointment from '../models/appointment.model.js';
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

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

export const uploadDiagnosticVideo = async (req, res) => {
    console.log(req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }

    try {
        const { appointmentId } = req.params;
        const doctorId = req.user.id;
        const originalFilePath = req.file.path;

        const mp4FilePath = path.join('uploads/videos/', `${path.parse(req.file.filename).name}.mp4`);

        ffmpeg(originalFilePath)
            .toFormat('mp4')
            .on('end', async () => {
                const fileStream = fs.createReadStream(mp4FilePath);

                const uploadParams = {
                    Bucket: AWS_BUCKET_NAME,
                    Key: `ecografias/${path.basename(mp4FilePath)}`,
                    Body: fileStream,
                    ContentType: 'video/mp4',
                };

                s3.upload(uploadParams, async (error, data) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error al cargar el video en S3' });
                    }

                    // Verificar que appointmentId es correcto
                    console.log(`Appointment ID: ${appointmentId}`);

                    // Actualizar el estado de la cita a 'completed'
                    const appointment = await Appointment.findByIdAndUpdate(
                        appointmentId,
                        { status: 'completed' },
                        { new: true }
                    );

                    // Verificar que la cita se encontró y se actualizó
                    if (!appointment) {
                        console.error('Appointment not found or could not be updated');
                        return res.status(404).json({ error: 'Appointment not found or could not be updated' });
                    }

                    const diagnostic = new Diagnostic({
                        appointmentId,
                        doctorId,
                        diagnosis: req.body.diagnosis,
                        videoUrl: data.Location,
                    });

                    await diagnostic.save();

                    fs.unlinkSync(originalFilePath);
                    fs.unlinkSync(mp4FilePath);

                    res.json({ message: 'Video subido a S3 y diagnóstico guardado exitosamente', diagnostic, appointment });
                });
            })
            .on('error', (error) => {
                res.status(500).json({ error: 'Error al convertir el video' });
            })
            .save(mp4FilePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el diagnóstico y el video' });
    }
};

export const listAllAppointments = async (req, res) => {
    const doctorId = req.params.doctorId; // Obtener el doctorId de los parámetros de la solicitud
    console.log(`Doctor ID: ${doctorId}`); // Añadir un log para verificar el doctorId

    try {
        const appointments = await Appointment.find({ doctorId }).populate('userId', 'name lastname email');
        console.log('Appointments:', appointments); // Log de las citas encontradas
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Error fetching appointments' });
    }
};