import React, { useEffect, useState } from 'react';
import { getQueries, addQuery, deleteQuery } from '../api/auth'; 
import './ConsultPage.css';

const ConsultPage = () => {
    const [queries, setQueries] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await getQueries();
                setQueries(response.data);
            } catch (error) {
                console.error('Error fetching queries:', error);
            }
        };
        fetchQueries();
    }, []);

    const handleAddQuery = async (e) => {
        e.preventDefault();
        const newQuery = await addQuery({ title, description });
        setQueries([newQuery, ...queries]);
        setTitle('');
        setDescription('');
    };

    

    return (
        <div className="consult-container">
            <div className="header">
                <h1>Consultas del Usuario</h1>
            </div>
            <div className="content">
                <div className="form-section">
                    <form onSubmit={handleAddQuery}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descripción"
                            required
                        />
                        <button type="submit">Agregar Consulta</button>
                    </form>
                </div>
                <div className="queries-section">
                    {queries.map((query) => (
                        <div className="query-card" key={query._id}>
                            <h2>{query.title}</h2>
                            <p>{query.description}</p>
                            <small>Fecha: {query.date ? new Date(query.date).toLocaleDateString() : 'Sin fecha'}</small>
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConsultPage;
