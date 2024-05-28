import {model, Schema} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        min: 0
    },
    images: {
        type: [{
            url: String,
            publicId: String
        }],
    },
    description: {
        type: String,
        trim: true
    },
    promotion: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    instock: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    collection: 'Products'
});

productSchema.index({name: 'text', description: 'text'});

export default model('Product', productSchema);