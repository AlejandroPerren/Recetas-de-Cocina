interface IIngredient {
    name: string;
    quantity: string;
}

interface IStep {
    stepNumber: number;
    instruction: string;
}

export interface IRecipes {
    title: string;
    description: string;
    ingredients: IIngredient[]; 
    steps: IStep[]; 
    cookingTime: number;
    type: string; 
    image: string;
    createdBy: string;
}
