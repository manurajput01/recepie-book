const ingredients = [];
const addReceipe = async (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll(".receipe-dets");

  let obj = {};
  inputs.forEach(
    (item) =>
      (obj[item.name] = item.name === "ingredients" ? ingredients : item.value)
  );

  try {
    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "index.html";
  } catch (err) {
    console.log(err);
  }
};

const addIngredients = () => {
  const input = document.querySelector("input[name='ingredients']");
  const ing = input.value;
  ingredients.push(ing);
  console.log(ingredients);
  input.value = "";

  if (ingredients.length > 1)
    document.querySelector(".current-ings").textContent += "," + ing;
  else document.querySelector(".current-ings").textContent += ing;
};
