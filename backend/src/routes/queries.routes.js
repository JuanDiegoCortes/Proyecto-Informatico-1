
import express from 'express';
import Query from '../models/query.model.js';

const router = express.Router();

router.get('/queries', async (req, res) => {
    try {
        const queries = await Query.find();
        
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las consultas' });
    }
});

router.post('/queries', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newQuery = new Query({ title, description });
        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la consulta' });
    }
});

export default router;
