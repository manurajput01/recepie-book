const recipeInfo = document.querySelector(".recipe");

const updaterecipeUI = (recipe) => {
  let html = `
    <h2 class="page-title">${recipe.title}</h2>
    <p>Takes ${recipe.time} to cook.</p>
    </br>
    </p>Ingredients are  ${recipe.ingredients}.</p>
    </br>
    <p class="method">${recipe.method}</p>`;

  recipeInfo.innerHTML = html;
};

const getRecipe = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/recipes/${id}`);
    if (!response.ok) {
      throw new Error("internal Server Error");
    }
    const data = await response.json();
    updaterecipeUI(data);
  } catch (err) {
    console.log(err);
  }
};

window.onload = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  getRecipe(id);
};
