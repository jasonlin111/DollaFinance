import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
   UserEmail: { type: String, required: true },
   Date: { type: Date, required: true },
   Category: { type: String, required: true },
   Description: { type: String, required: true },
   Price: { type: Number, required: true },
})

var Transaction = mongoose.models.Transaction ||
                  mongoose.model("Transaction", TransactionSchema);

export default Transaction;