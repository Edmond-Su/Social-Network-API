const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

const validateEmail = function(email){
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/
    return re.test(email)
}

//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Please fill in a valid email address"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: this
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema
    .virtual('friendCount')
    .get(function (){
        return `${this.friends.length}`;
    })

const User = model('user', userSchema);

module.exports = User;