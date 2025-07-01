import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routeRouter from './routes/route.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/route', routeRouter);

const PORT = process.eventNames.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
