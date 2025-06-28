import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routeRoutes from './routes/route';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/route', routeRoutes);

const PORT = process.eventNames.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
