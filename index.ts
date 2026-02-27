import 'dotenv/config';
import express, { Express } from 'express';

const app: Express = express();

app.use(express.json());

// --- Your routes will go below this line ---
import {
  changeNameId,
  createPet,
  getHabitById,
  getPets,
  getPetsId,
  releasePet,
} from './controllers/pets.js';

app.post('/pets', createPet);
app.get('/pets', getPets);
app.get('/pets/:petId', getPetsId);
app.put('/pets/:petId', changeNameId);
app.delete('/pets/:petId', releasePet);
app.post('/pets:petId/habits', getHabitById);
// --- Your routes will go above this line ---

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Tender listening on http://localhost:${PORT}`);
});
