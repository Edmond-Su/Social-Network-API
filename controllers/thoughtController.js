const {User, Thought } = require('../models')

module.exports = {
    // get all thoughts
    async getThoughts (req,res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts)
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get single thought by Id
    async getSingleThought (req,res) {
        try {
            const thought = await Thought.findOne( { _id : req.params.thoughtId } );

            if(!thought) {
                return res.status(404).json( { message : 'No thought with that ID' } );
            };

            res.json(thought);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create new thought
    async createThought (req,res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id : req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new : true }
            );

            if (!user) {
                const deleteThought = await Thought.findOneAndRemove( { _id : thought._id } )
                return res.status(404).json( { message: "No user with that Id. Thought was not created" } )
            };

            res.json(thought,user)
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // delete thought by Id
    async deleteThought (req,res) {
        try {
            const thought = await Thought.findOneAndRemove( { _id : req.params.thoughtId } );

            if (!thought) {
                return res.status(404).json( { message: 'No thought with that ID' } );
            };

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId  } },
                { new : true }
            );

            if (!user) {
                return res.status(404).json( { message: 'No user with that ID' } );
            };

            res.json({ message: 'Thought successfully deleted' });
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // update a thought by Id
    async updateThought (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id : req.params.thoughtId },
                { $set : req.body },
                { new : true }
            );

            if (!thought) {
                return res.status(404).json( { message: 'No thought with that ID' } );
            };

            res.json(thought)
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create reaction
    async createReaction (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id : req.params.thoughtId},
                { $addToset : { reactions: req.body } },
                { new : true}
            );

            if (!thought) {
                return res.status(404).json( { message: 'No thought with that ID' } );
            };

            res.json(thought)
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // delete reaction
    async deleteReaction (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id : req.params.thoughtId},
                { $pull : { reactions: { reactionId : req.params.reactionId }  } },
                { new : true}
            );

            if (!thought) {
                return res.status(404).json( { message: 'No thought with that ID' } );
            };

            res.json(thought)
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

}