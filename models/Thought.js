const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            require: true,
            ref: 'User',
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        }
    }
);



const Thought = model('thought', thoughtSchema);

module.exports = Thought;