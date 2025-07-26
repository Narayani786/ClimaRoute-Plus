import express from 'express';
import { getRoute } from '../controllers/routeControllers.js';

const router = express.Router();
router.post('/', getRoute);

export default router;
