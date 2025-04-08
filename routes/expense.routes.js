import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller.js';
const router = Router();


router.use(auth)
router.post('/', addExpense)
router.get('/', getExpenses)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router;