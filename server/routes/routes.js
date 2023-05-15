const express = require('express');
const todoModel = require('../schema/todo-Schema');
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const result = await todoModel.find({});
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
});
route.post('/addTodo', async (req, res) => {
    try {
        const { text } = req.body;
        const todoData = new todoModel({
            text
        });
        const result = await todoData.save();
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json(error.message);
    }
});
route.post('/updateTodo', async (req, res) => {
    try {
        const { _id, text } = req.body;
        const result = await todoModel.findByIdAndUpdate(_id, { text });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
})
route.post('/delTodo', async (req, res) => {
    try {
        const { _id } = req.body;
        const result = await todoModel.findByIdAndDelete(_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = route;