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
    // Get single user by Id
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

            res.json({ message: 'User successfully deleted' });

        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // add friend
    async addFriend (req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id : req.params.userId},
                { $addToSet : { friends: req.params.friendId } },
                { new : true }
            );

            const friend = await User.findOne( { _id : req.params.friendId } )

            if(!user) {
                return res.status(404).json({message: "No user with that ID"});
            };

            if(!friend) {
                return res.status(404).json({message: "No user with friendId"});
            };

            res.json( { message: 'Friend added successfully!' } )
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove friend
    async removeFriend (req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id : req.params.userId},
                { $pull : { friends: req.params.friendId } },
                { new : true }
            );

            const friend = await User.findOne( { _id : req.params.friendId } )

            if(!user) {
                return res.status(404).json({message: "No user with that ID"});
            };

            if(!friend) {
                return res.status(404).json({message: "No user with friendId"});
            };

            res.json( { message: 'Friend removed!' } )
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}