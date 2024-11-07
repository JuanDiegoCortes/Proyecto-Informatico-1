import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { signup, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit((data) => {
        signup(data);
    });

    return (
        <div style={styles.container}>
            <form onSubmit={onSubmit} style={styles.form}>
                <h2 style={styles.title}>Register</h2>
                <div style={styles.inputGroup}>
                    <input 
                        type="text" 
                        {...register('name', { required: true })} 
                        placeholder="Name" 
                        style={styles.input}
                    />
                    {errors.name && <span style={styles.error}>Name is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <input 
                        type="text" 
                        {...register('lastname', { required: true })} 
                        placeholder="Lastname" 
                        style={styles.input}
                    />
                    {errors.lastname && <span style={styles.error}>Lastname is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <input 
                        type="date" 
                        {...register('birthdate', { required: true })} 
                        placeholder="Birthdate" 
                        style={styles.input}
                    />
                    {errors.birthdate && <span style={styles.error}>Birthdate is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <input 
                        type="text" 
                        {...register('phone_number', { required: true })} 
                        placeholder="Phone Number" 
                        style={styles.input}
                    />
                    {errors.phone_number && <span style={styles.error}>Phone Number is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <input 
                        type="email" 
                        {...register('email', { required: true })} 
                        placeholder="Email" 
                        style={styles.input}
                    />
                    {errors.email && <span style={styles.error}>Email is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <input 
                        type="password" 
                        {...register('password', { required: true })} 
                        placeholder="Password" 
                        style={styles.input}
                    />
                    {errors.password && <span style={styles.error}>Password is required</span>}
                </div>
                <div style={styles.inputGroup}>
                    <select {...register('role', { required: true })} style={styles.input}>
                        <option value="">Select Role</option>
                        <option value="User">User</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                    {errors.role && <span style={styles.error}>Role is required</span>}
                </div>
                <button type='submit' style={styles.button}>
                    Register
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

export default RegisterPage;
