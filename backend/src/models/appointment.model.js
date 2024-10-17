import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // Referencia al usuario que solicita la cita
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: false, // Se asigna al aprobar la cita
    }, // Referencia al doctor asignado
    date: { type: Date, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
},
{ timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
