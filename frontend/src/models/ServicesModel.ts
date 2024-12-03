export interface ICreateRecipe {
    title: string;
    description: string;
    ingredients: { name: string; quantity: string }[]; 
    steps: { stepNumber: number; instruction: string }[]; 
    cookingTime: number;
    type: string;
    image: string;
  }
  
  export interface IRecipes {
    title: string;
    description: string;
    ingredients: { name: string; quantity: string }[]; 
    steps: { stepNumber: number; instruction: string }[]; 
    cookingTime: number;
    type: string;
    image: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  }
  