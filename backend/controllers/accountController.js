const { Account } = require('../models');
const mongoose = require('mongoose');

// Get account balance
const getBalance = async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        console.error('Error retrieving account balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Transfer funds between accounts
const transferFunds = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { to, amount } = req.body;

    try {
        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Invalid account' });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error during funds transfer:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        session.endSession();
    }
};

module.exports = {
    getBalance,
    transferFunds
};
