import mongoose from "mongoose";

const diagnosticSchema = new mongoose.Schema(
{
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    }, // Referencia a la cita
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    }, // Referencia al doctor que realizó el diagnóstico
    diagnosis: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Enlace al video de la ecografía
},
{ timestamps: true }
);

export default mongoose.model("Diagnostic", diagnosticSchema);
