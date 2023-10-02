const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionID: {
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            max: 280,
        },
        username: {
            type: String,
            require: true,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

module.exports = reactionSchema