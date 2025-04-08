import Expense from '../models/expense.model.js';
import { format } from 'date-fns';
export const addExpense = async (req, res) => {
    const expense = new Expense({ ...req.body, user: req.user.id });
    await expense.save();
    res.status(201).json(expense);
}


export const getExpenses = async (req, res) => {
    const { filter, startDate, endDate, category } = req.query;
    let query = { user: req.user.id }

    const convertToDate = (date) => {
        const parsedDate = new Date(date)
        return isNaN(parsedDate) ? null : parsedDate;
    }
    if (filter) {
        const now = new Date();
        switch (filter) {
            case 'last-week':
                const lastWeek = new Date(now.setDate(now.getDate() - 7));
                query.date = { $gte: lastWeek };
                break;
            case 'last-month':
                const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
                query.date = { $gte: lastMonth };
                break;
            case 'last-3-months':
                const last3Months = new Date();
                last3Months.setMonth(now.getMonth() - 3);
                query.date = { $gte: last3Months };
                break;
            default:
                return res.status(400).json({ message: 'Filtro de fecha no válido' });
        }
    } else if (startDate && endDate) {

        // Verificar si las fechas son validas
        const start = convertToDate(startDate);
        const end = convertToDate(endDate);

        if (!start || !end) {
            return res.status(400).json({ message: 'Las fechas proporcionadas no son válidas' });
        }

        if (start > end) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser mayor que la fecha de fin' });
        }
        // Se agrego el rango de las fechas al query
        query.date = { $gte: start, $lte: end };

    } else if (endDate) {
        const end = convertToDate(endDate);

        if (!end) {
            return res.status(400).json({ message: 'La fecha fin no es válida' });
        }

        query.date = { $lte: end };
    }

    if (category) {
        query.category = category;
    }

    try {
        const expenses = await Expense.find(query).sort({ date: -1 });

        if (expenses.length === 0) return res.status(404).json({ message: 'No se encontraron gastos' });

        const formattedExpenses = expenses.map(expense => ({
            ...expense.toObject(),
            date: format(new Date(expense.date), 'dd/MM/yyyy')  // Formato de fecha: día/mes/año
        }));
        res.json(formattedExpenses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los gastos' });
    }


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
