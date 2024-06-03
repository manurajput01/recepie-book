const recipeList = document.querySelector(".recipe-list");

const updateRecipeListUI = (recipes) => {
  // Clear previous recipes
  recipeList.innerHTML = '';

  if (recipes.length === 0) {
    recipeList.innerHTML = `<h2 style="text-align:center">No Recipes Found!!</h2>`;
  } else {
    for (let item of recipes) {
      let html = `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.time} to make</p>
        <div>${item.method.slice(0, 10)}....</div>
        <a href ="recipe.html?id=${item.id}">Cook this</a>
      </div>`;

      // Append each recipe card to the recipeList
      recipeList.innerHTML += html;
    }
  }
};


const getRecipes = async () => {
  try {
    const response = await fetch("http://localhost:3000/recipes/");

    if (!response.ok) {
      throw new Error("Internal Server Error");
    }
    const data = await response.json();
    updateRecipeListUI(data);
  } catch (err) {
    alert(err.message);
  }
};

const searchRecipe = async (e) => {
  const term = e.target.value.toLowerCase(); // Convert search term to lowercase

  try {
    const response = await fetch(`http://localhost:3000/recipes`);

    if (!response.ok) {
      throw new Error("Internal Server Error");
    }

    const data = await response.json();

    // Filter recipes based on lowercase titles
    const filteredRecipes = data.filter(recipe => recipe.title.toLowerCase().includes(term));
    
    updateRecipeListUI(filteredRecipes);
  } catch (error) {
    alert(error.message);
  }
};

window.onload = () => {
  getRecipes();
};


