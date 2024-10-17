import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // Referencia al usuario
    specialty: {
        type: String,
        enum: ["Radiologist", "Gynecologist"],
        required: true,
    }, 
    licenseNumber: { type: String, required: true, unique: true }, // Número de licencia profesional
},
{ timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
