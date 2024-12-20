import React from 'react'
import AllRecipes from '../components/AllRecipes'
import RecipeFilter from '../utils/Filter'


const Home = () => {
  return (
    <div>
      <RecipeFilter />
      <AllRecipes/>
    </div>
  )
}

export default Home