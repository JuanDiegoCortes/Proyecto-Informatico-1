import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const mongoURI = 'mongodb://localhost:27017/Ecografias4D';
const connection = mongoose.createConnection(mongoURI);
let gfs;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads'); // Usa el nombre de colección 'uploads' o el que prefieras
});

// Configura el almacenamiento para multer
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: `${Date.now()}-${file.originalname}`,
            bucketName: 'uploads', // Debe coincidir con el nombre usado en `gfs.collection`
        };
    }
});

const upload = multer({ storage });
export { upload, connection };
