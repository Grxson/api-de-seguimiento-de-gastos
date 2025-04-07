import Expense from '../models/expense.model.js';

export const addExpense = async (req, res) => {
    const expense = new Expense({ ...req.body, user: req.user.id });
    await expense.save();
    res.status(201).json(expense);
}


export const getExpenses = async (req, res) => {
    const { filter, startDate, endDate } = req.query;
    let query = { user: req.user.id }

    const now = new Date();
    if (filter) {
        switch (filter) {

        }

    } else if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
}

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const updated = await Expense.findOneAndUpdate(
        { _id: id, user: req.user.id },
        req.body,
        { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Gasto no encontrado" });
    res.json(updated);
}

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const deleted = await Expense.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Gasto no encontrado' });
    res.json({ message: 'Gasto eliminado' });
}
