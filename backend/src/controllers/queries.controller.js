
import Query from '../models/Query.js'; 

export const deleteQuery = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Query.findByIdAndDelete(id); 
        if (!result) {
            return res.status(404).json({ message: 'Consulta no encontrada' });
        }
        res.status(200).json({ message: 'Consulta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la consulta', error });
    }
};
