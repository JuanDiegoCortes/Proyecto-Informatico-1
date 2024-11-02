import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [showDoctorLogin, setShowDoctorLogin] = useState(false);

  const onSubmit = handleSubmit((data) => {
    signin(data, (userRole) => {
      if (userRole === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/');
      }
    });
  });

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
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
        <button type='submit' style={styles.button}>
          Login
        </button>
      </form>

      <button onClick={() => setShowDoctorLogin(!showDoctorLogin)} style={styles.doctorButton}>
        Login Doctor
      </button>
      
      {showDoctorLogin && (
        <div style={styles.doctorMenu}>
          <p style={styles.doctorText}>Login exclusivo para doctores</p>
          <form onSubmit={onSubmit} style={styles.form}>
            <button type='submit' style={styles.button}>
              Iniciar sesión como Doctor
            </button>
          </form>
        </div>
      )}
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
    width: '100%',
    maxWidth: '320px',
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
    marginBottom: '0.5rem',
  },
  doctorButton: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  doctorMenu: {
    marginTop: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#e9ecef',
    textAlign: 'center',
  },
  doctorText: {
    marginBottom: '0.5rem',
    color: '#333',
    fontSize: '0.875rem',
  },
};

export default LoginPage;