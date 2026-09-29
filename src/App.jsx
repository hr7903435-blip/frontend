// import logo from "./images/foodie-logo.png";

import React, { useState } from "react";
import "./App.css";
import DeliveryMap from "./DeliveryMap";

const API_URL = "http://localhost:5001/api";



const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 199,
    rating: 4.8,
    description: "Fresh tomato, mozzarella and basil",
    image: "/images/pizza.jpg",
    emoji: "🍕",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 149,
    rating: 4.7,
    description: "Juicy burger with cheese and vegetables",
    image: "/images/burger.jpg",
    emoji: "🍔",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 249,
    rating: 4.9,
    description: "Aromatic basmati rice with spicy chicken",
    image: "/images/chickenbriyani.jpg",
    emoji: "🍛",
  },
  {
    id: 4,
    name: "Veg Noodles",
    category: "Chinese",
    price: 179,
    rating: 4.6,
    description: "Delicious noodles with fresh vegetables",
    image: "/images/noodles.jpg",
    emoji: "🍜",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 129,
    rating: 4.8,
    description: "Rich chocolate cake with creamy topping",
    image: "/images/chocolate.jpg",
    emoji: "🍰",
  },
  {
    id: 6,
    name: "Farmhouse Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.9,
    description: "Loaded with fresh vegetables and cheese",
    image: "/images/farmhouse-pizza.jpg",
    emoji: "🍕",
  },
];

// ================= CATEGORIES =================

const categories = [
  { name: "All", emoji: "🍽️" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Chinese", emoji: "🍜" },
  { name: "Dessert", emoji: "🍰" },
];

// ================= MAIN APP =================

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cartOpen, setCartOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const [location, setLocation] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");

  // ================= FILTER FOOD =================

  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  // ================= ADD TO CART =================

  function addToCart(food) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...food, quantity: 1 }];
    });

    setCartOpen(true);
  }

  // ================= INCREASE QUANTITY =================

  function increaseQuantity(id) {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // ================= DECREASE QUANTITY =================

  function decreaseQuantity(id) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // ================= REMOVE ITEM =================

  function removeItem(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  // ================= TOTAL =================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ================= PLACE ORDER =================

  function placeOrder() {
    if (cart.length === 0) {
      alert("Please add food to your cart.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!location) {
      alert("Please select your delivery location on the map.");
      return;
    }

    setOrderMessage(
      `Your order of ₹${totalPrice} has been placed using ${payment}.`
    );

    setCartOpen(false);
    setSuccessOpen(true);
  }

  // ================= CONTINUE SHOPPING =================

  function continueShopping() {
    setSuccessOpen(false);
    setCart([]);
    setAddress("");
    setLocation(null);
    setPayment("Cash on Delivery");
  }

  // ================= UI =================

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

      <a href="#home" className="logo">
  <img
  src="/images/foodie-logo.png"
  alt="Foodie Logo"
  className="logo-icon"
/>

  <span>Foodie</span>
  
</a>


        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
          🛒 Cart <span>{cartCount}</span>
        </button>

      </header>

      {/* ================= HERO ================= */}

      <section className="hero" id="home">

        <div className="hero-content">

          <span className="tag">
            🍕 Delicious food at your doorstep
          </span>

          <h1>
            Hungry?
            <br />
            Order your <span>favourite food.</span>
          </h1>

          <p>
            Discover delicious food from the best restaurants
            around you and get it delivered to your doorstep.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search pizza, burger, biryani..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button
              onClick={() =>
                document
                  .getElementById("menu")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              🔍 Search
            </button>

          </div>

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        <h2>What's on your mind?</h2>

        <div className="category-container">

          {categories.map((category) => (

            <button
              key={category.name}
              className={`category ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.emoji}
              <span>{category.name}</span>
            </button>

          ))}

        </div>

      </section>

      {/* ================= FOOD MENU ================= */}

      <section className="menu" id="menu">

        <div className="section-heading">

          <h2>Popular Food</h2>

          <p>Choose your favourite meal</p>

        </div>

        <div className="food-container">

          {filteredFoods.length > 0 ? (

            filteredFoods.map((food) => (

              <div className="food-card" key={food.id}>

                <div className="food-image">

                  <img
                    src={food.image}
                    alt={food.name}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display =
                        "flex";
                    }}
                  />

                  <div className="food-placeholder">
                    {food.emoji}
                  </div>

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
                      onClick={() => addToCart(food)}
                    >
                      + Add
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="no-food">
              <h3>😔 No food found</h3>
              <p>Try searching for another food item.</p>
            </div>

          )}

        </div>

      </section>

      {/* ================= OFFERS ================= */}

      <section className="offers" id="offers">

        <div className="offer-card">

          <div>
            <span>LIMITED TIME OFFER</span>

            <h2>Get 20% OFF on your first order!</h2>

            <p>Order your favourite food today.</p>
          </div>

          <div className="offer-icon">🍔</div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className="about" id="about">

        <h2>About Foodie</h2>

        <p>
          Foodie brings your favourite meals to your doorstep.
          Explore delicious food, select your delivery location,
          and enjoy a simple food ordering experience.
        </p>

      </section>

      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-logo">
          🍔 Foodie
        </div>

        <p>
          Delicious food, delivered with love.
        </p>

        <p className="copyright">
          © 2026 Foodie. All rights reserved.
        </p>

      </footer>

      {/* ================= CART ================= */}

      {cartOpen && (

        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >

          <div
            className="cart"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="cart-header">

              <h2>🛒 Your Cart</h2>

              <button
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>

            </div>

            <div className="cart-items">

              {cart.length === 0 ? (

                <p className="empty-cart">
                  🛒 Your cart is empty.
                </p>

              ) : (

                cart.map((item) => (

                  <div className="cart-item" key={item.id}>

                    <div className="cart-food">
                      {item.emoji}
                    </div>

                    <div className="cart-info">

                      <strong>{item.name}</strong>

                      <small>₹{item.price} each</small>

                    </div>

                    <div className="quantity">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>

                  </div>

                ))

              )}

            </div>

            {/* ================= CHECKOUT ================= */}

            <div className="checkout">

              <h3>Delivery Address</h3>

              <textarea
                placeholder="Enter your complete delivery address..."
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />

              {/* MAP */}

              <DeliveryMap
                onLocationSelect={setLocation}
              />

              <h3>Payment Method</h3>

              <select
                value={payment}
                onChange={(event) => setPayment(event.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
              </select>

              <div className="total">

                <span>Total</span>

                <strong>₹{totalPrice}</strong>

              </div>

              <button
                className="order-button"
                onClick={placeOrder}
              >
                Place Order · ₹{totalPrice}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= ORDER SUCCESS ================= */}

      {successOpen && (

        <div className="success-overlay">

          <div className="success-box">

            <div className="success-icon">✅</div>

            <h2>Order Placed Successfully!</h2>

            <p>{orderMessage}</p>

            <div className="order-status">

              <div className="status active">
                ✓ Order Confirmed
              </div>

              <div className="status">
                ⏳ Preparing Your Food
              </div>

              <div className="status">
                🛵 Out for Delivery
              </div>

            </div>

            <button
              className="continue-button"
              onClick={continueShopping}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      )}

    </div>
  );
}