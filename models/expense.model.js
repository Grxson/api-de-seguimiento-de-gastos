import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    amount: Number,
    category: {
        type: String,
        enum: ['Comestibles', 'Ocio', 'Electrónica', 'Servicios públicos', 'Ropa', 'Salud', 'Otros'],
    },
    date: { type: Date, default: Date.now },
})

export default mongoose.model('Expense', expenseSchema);