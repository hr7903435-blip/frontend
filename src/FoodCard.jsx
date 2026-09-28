import React from "react";

function FoodCard({ food, onAdd }) {
    return (
        <div className="food-card">

            <div className="food-image">
                <img
                    src={food.image}
                    alt={food.name}
                />
            </div>

            <div className="food-details">

                <span className="rating">
                    ⭐ {food.rating}
                </span>

                <h3>{food.name}</h3>

                <p>{food.description}</p>

                <div className="food-bottom">

                    <strong>₹{food.price}</strong>

                    <button
                        className="add-button"
                        onClick={() => onAdd(food)}
                    >
                        + Add
                    </button>

                </div>

            </div>

        </div>
    );
}

export default FoodCard;