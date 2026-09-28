import React from "react";

function Navbar({ cartCount, onCartClick }) {
    return (
        <header className="navbar">

            <div className="logo">
                🍴 <span>Foodie</span>
            </div>

            <nav>
                <a href="#home">Home</a>
                <a href="#menu">Menu</a>
                <a href="#offers">Offers</a>
                <a href="#about">About</a>
            </nav>

            <button
                className="cart-button"
                onClick={onCartClick}
            >
                🛒 Cart
                <span>{cartCount}</span>
            </button>

        </header>
    );
}

export default Navbar;