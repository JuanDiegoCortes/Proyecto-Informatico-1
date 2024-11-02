// RegisterDoctorPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterDoctorPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { signupDoctor } = useAuth(); // Asegúrate de definir la función de registro de doctor en el contexto

    const onSubmit = handleSubmit((data) => {
        signupDoctor(data); // Registra al doctor
        navigate('/'); // Redirige a la página principal u otra después del registro
    });

    return (
        <div style={styles.container}>
            <form onSubmit={onSubmit} style={styles.form}>
                <h2 style={styles.title}>Register as Doctor</h2>
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        {...register('specialty', { required: true })}
                        placeholder="Specialty"
                        style={styles.input}
                    />
                    {errors.specialty && <span style={styles.error}>Specialty is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        {...register('licenseNumber', { required: true })}
                        placeholder="License Number"
                        style={styles.input}
                    />
                    {errors.licenseNumber && <span style={styles.error}>License Number is required</span>}
                </div>
                <button type="submit" style={styles.button}>
                    Register as Doctor
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '1rem',
        textAlign: 'center',
        color: '#333',
    },
    inputGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    error: {
        color: 'red',
        fontSize: '0.875rem',
    },
    button: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '1rem',
    },
};

export default RegisterDoctorPage;
