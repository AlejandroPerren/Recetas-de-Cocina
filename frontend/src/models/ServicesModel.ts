export interface IRecipes {
    _id: string;
    title: string;
    description: string;
    ingredients: { name: string; quantity: string; _id: string }[];
    steps: { stepNumber: number; instruction: string; _id: string }[];
    cookingTime: number;
    type: string;
    image: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}
