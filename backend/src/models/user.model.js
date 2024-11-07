import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'doctor', 'admin'],
            default: 'user',
        },
        specialty: {
            type: String,
            enum: ['Radiologist', 'Gynecologist'],
            required: false,
        },
        licenseNumber: {
            type: String,
            required: function() {
                return this.role === 'doctor';
            },
        },
    },
    { timestamps: true }
);

// Crear un índice parcial en licenseNumber
userSchema.index({ licenseNumber: 1 }, { unique: true, partialFilterExpression: { licenseNumber: { $type: "string" } } });

export default mongoose.model('User', userSchema);