import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost/Ecografias4D');
        console.log('Database connected');
    }catch(e){
        console.log('Error connecting to database', e);
    }
}