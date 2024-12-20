import mongoose from 'mongoose';

export const userEntity = () => {
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe',
            },
        ],
    },);
    return mongoose.models.Users || mongoose.model("Users", userSchema)
};



