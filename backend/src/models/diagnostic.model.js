import mongoose from "mongoose";

const diagnosticSchema = new mongoose.Schema(
    {
      appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true }, // Referencia a la cita
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Usuario con rol de doctor que realiza el diagnóstico
      diagnosis: { type: String, required: true },
      videoUrl: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Diagnostic", diagnosticSchema);