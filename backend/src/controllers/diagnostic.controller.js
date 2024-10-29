import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// Configuración de la conexión a MongoDB
const mongoURI = 'mongodb://localhost/Ecografias4D';
const connection = mongoose.createConnection(mongoURI);

let gfs;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads'); // Nombre de la colección de archivos en MongoDB
});

// Configuración de almacenamiento en GridFS
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
            return {
                bucketName: 'uploads',
                filename: `${Date.now()}-${file.originalname}`
            };
        } else {
            return null; // Cancelamos la carga si el archivo no es del tipo adecuado
        }
    }
});

// Middleware de Multer
const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 50 } // Límite de tamaño del archivo de 50MB
}).single('file');

// Controlador para subir archivo
export const uploadFile = (req, res) => {
    uploadMiddleware(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error en la carga de archivo', error: err.message });
            } else {
                return res.status(500).json({ message: 'Error al subir el archivo', error: err.message });
            }
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Por favor, sube un archivo válido (jpg, png o mp4).' });
        }
        // Confirmamos si el archivo se subió correctamente
        gfs.files.findOne({ filename: req.file.filename }, (err, file) => {
            if (err || !file) {
                return res.status(404).json({ message: 'Archivo no encontrado después de la carga' });
            }
            res.status(200).json({ message: 'Archivo subido exitosamente', file });
        });
    });
};
// Controlador para obtener archivo por ID
export const getFile = (req, res) => {
    const fileId = req.params.id;
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
        if (err || !file) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
};

// Controlador para eliminar archivo por ID
export const deleteFile = (req, res) => {
    const fileId = req.params.id;
    gfs.remove({ _id: mongoose.Types.ObjectId(fileId), root: 'uploads' }, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el archivo', error: err.message });
        }
        res.status(200).json({ message: 'Archivo eliminado exitosamente' });
    });
};
