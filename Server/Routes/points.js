import express from 'express';
import { addPoints } from '../Controllers/pointsController.js';

const router = express.Router();

router.post('/add-points', addPoints);

export default router; 
