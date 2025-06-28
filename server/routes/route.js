import express from 'express';
import { getRoute } from '../controllers/routeControllers';

const router = express.Router();
router.get('/', getRoute);

export default router;
