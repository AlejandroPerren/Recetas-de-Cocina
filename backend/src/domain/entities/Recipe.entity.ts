import mongoose from 'mongoose';

export const recipeEntity = () => {
    const recipeSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: [
            {
                name: { type: String, required: true },
                quantity: { type: String, required: true },
            },
        ],
        steps: [
            {
                stepNumber: Number,
                instruction: { type: String, required: true },
            },
        ],
        cookingTime: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'],
            required: true,
        },
        image: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    }, { timestamps: true });
    return mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
}


