import mongoose from "mongoose";

const doctorAvailabilitySchema = new mongoose.Schema(
{
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    }, // Referencia al doctor
    date: { type: Date, required: true }, // Fecha y hora ocupada
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    }, // Referencia a la cita que ocupa el horario
},
{ timestamps: true }
);

export default mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
