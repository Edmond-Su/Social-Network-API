// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;

const {User, Thought } = require('../models')

module.exports = {
    //Get all users
    async getUsers (req,res) {
        try {
            const users = await User.find();

            res.json(users);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get single user
    async getSingleUser (req,res) {
        try {
            const user = await Student.findOne({_id: req.params.userId});

            if (!user){
                return res.status(404).json({message: 'No user with that ID'})
            };

            res.json(user);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //Create new suer
    async createUser (req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update user
    async updateUser (req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set : req.body},
            );
            
            if (!user) {
                return res.status(404).json({message: "No user with that ID"});
            }
            res.json(user);
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete user
    async deleteUser (req,res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            if(!user) {
                return res.status(404).json({message: "No user with that ID"});
            };

        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}