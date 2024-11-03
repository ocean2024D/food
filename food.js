let container = document.createElement("div");
container.classList = "container";
container.classList.add(".modal");
document.body.appendChild(container);
container.id = "myModal";

const search = async () => {
  container.innerHTML = "";
  let input = document.getElementById("searchBox").value;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    const data = await response.json();

    if (data.meals) {
      console.log(data.meals);

      for (let i = 0; i < data.meals.length; i++) {
        let title = document.createElement("h2");

        title.innerText = data.meals[i].strMeal;
        let divMeal = document.createElement("div");
        divMeal.classList.add("divmeal");

        let image = document.createElement("img");
        image.src = data.meals[i].strMealThumb;

        let link = document.createElement("a");
        divMeal.appendChild(title);
        link.appendChild(image);
        divMeal.appendChild(link);

        container.appendChild(divMeal);

        let inst = document.createElement("h2");
        inst.innerText = "Ingredients";
        inst.id = "icindekiler";

        inst.id = "icindekiler";

        divMeal.appendChild(inst);

        inst.hidden = true;

        ///CREATION modallll

        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];

        image.onclick = function () {
          modal.style.display = "block";
          let title = document.getElementById("baslik");
          title.innerText = data.meals[i].strMeal;
          document.getElementById("img").src = data.meals[i].strMealThumb;

          const ingredientList = document.getElementById("listOfInstr");
          ingredientList.innerHTML = "";
          ingredientList.appendChild(inst);

          let modalInstructions = document.getElementById("instructionsText");
          let tarifBaslikCon = document.getElementById("tarifBaslik");
          tarifBaslikCon.innerText = "Instructions";
          modalInstructions.innerText = data.meals[i].strInstructions;
          for (let j = 1; j < 20; j++) {
            let ingredient = data.meals[i][`strIngredient${j}`];
            let measures = data.meals[i][`strMeasure${j}`];
            if (ingredient && measures) {
              let listItem = document.createElement("li");
              listItem.innerText = `${ingredient} - ${measures}`;
              ingredientList.appendChild(listItem);
              inst.hidden = false;
            }
          }
        };
        span.onclick = function () {
          modal.style.display = "none";
        };

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
    } else {
      alert("No results. Please try another term.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("There was an error fetching the data. Please try again later.");
  }

  document.getElementById("searchBox").value = "";
};

//enter
document.getElementById("searchBox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search();
  }
});
