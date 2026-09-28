import React from "react";

import FoodCard from "./FoodCard";

function FoodMenu({ foods, onAdd }) {
    return (
        <section className="menu" id="menu">

            <div className="section-heading">

                <h2>Popular Food</h2>

                <p>Choose your favourite meal</p>

            </div>

            <div className="food-container">

                {foods.length === 0 ? (
                    <p>No food items found.</p>
                ) : (
                    foods.map(food => (
                        <FoodCard
                            key={food._id}
                            food={food}
                            onAdd={onAdd}
                        />
                    ))
                )}

            </div>

        </section>
    );
}

export default FoodMenu;