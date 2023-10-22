const Priority = require('../models/priority.model')

const createPriority = async (req, res) => {
    const { label, code, color } = req.body
    try{
        const priority = await Priority.create({label, code, color})
        if(priority){
            res.status(200).json({message: 'Priority added', priority: priority})
        }
    } catch (err){
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    createPriority
}