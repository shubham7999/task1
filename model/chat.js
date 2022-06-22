const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    message: {
        type: String,
        required: true,
    },
    isSent: {
        type: String,
        required: true
    },

},  {timestamps: true}
);


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;