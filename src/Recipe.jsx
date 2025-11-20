import React, { useEffect, useState } from "react";
import "./App.css";

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getRecipes = (query = "") => {
    const url = query
      ? "https://dummyjson.com/recipes/search?q=" + query
      : "https://dummyjson.com/recipes";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []);
      })
      .catch(() => {
        setRecipes([]);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getRecipes(search);
  };

  return (
    <div className="recipe-container">
      <h1> Recipe Finder</h1>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </form>

      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((r) => (
            <div key={r.id} className="recipe-card">
              <img src={r.image} alt={r.name} />
              <h3>{r.name}</h3>
              <p>
                {r.cuisine} | {r.prepTimeMinutes} mins | {r.rating}
              </p>
              <button
                className="view-btn"
                onClick={() => setSelectedRecipe(r)}
              >
                View Recipe
              </button>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      
      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-btn"
              onClick={() => setSelectedRecipe(null)}
            >
              &times;
            </span>
            <h2>{selectedRecipe.name}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="modal-img"
            />
            <p><strong>Cuisine:</strong> {selectedRecipe.cuisine}</p>
            <p><strong>Prep Time:</strong> {selectedRecipe.prepTimeMinutes} mins</p>
            <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
            <p><strong>Rating:</strong>  {selectedRecipe.rating}</p>

            <h4> Ingredients:</h4>
            <ul>
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h4>Instructions:</h4>
            <ol>
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipe;
