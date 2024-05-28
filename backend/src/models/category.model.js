import {model, Schema} from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    isSizes:{
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    collection: 'Categories'
});

export default model('Category', categorySchema);