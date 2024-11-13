import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <>
            <button onClick={handleGoHome} className="home-button">
                Volver
            </button>
            <style>
                {`
                .home-button {
                    background-color: #6b90a5; /* Verde */
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 12px;
                    transition: background-color 0.3s ease;
                }

                .home-button:hover {
                    background-color: #6b90a5; /* Verde más oscuro */
                }
                `}
            </style>
        </>
    );
};

export default HomeButton;