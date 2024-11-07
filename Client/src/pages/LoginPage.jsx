import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signin } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data, (role) => {
        if (role === 'Administrator') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      // Aquí puedes mostrar un mensaje de error en la UI si es necesario
    }
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

export default LoginPage;