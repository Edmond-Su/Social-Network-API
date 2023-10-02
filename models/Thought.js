const { Schema, model } = require('mongoose');

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
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);



const Thought = model('thought', thoughtSchema);

module.exports = Thought