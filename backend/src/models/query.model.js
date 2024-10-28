
import mongoose from 'mongoose';

const queryModelSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

const Query = mongoose.model('QueryModel', queryModelSchema);
export default Query;
