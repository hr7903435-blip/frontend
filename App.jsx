import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import FoodMenu from "./components/FoodMenu";

import Cart from "./components/Cart";

import Checkout from "./components/Checkout";

import "./App.css";

const API_URL = "http://localhost:5001/api";

function App() {

    const [foods, setFoods] = useState([]);

    const [cart, setCart] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("all");

    const [showCart, setShowCart] = useState(false);

    const [showCheckout, setShowCheckout] =
        useState(false);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ======================================
    // LOAD FOOD FROM BACKEND
    // ======================================

    useEffect(() => {

        async function loadFoods() {
            try {
                const response = await fetch(
                    `${API_URL}/foods`
                );

                if (!response.ok) {
                    throw new Error("Failed to load food");
                }

                const data = await response.json();

                setFoods(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadFoods();

    }, []);

    // ======================================
    // ADD TO CART
    // ======================================

    function addToCart(food) {

        setCart(previousCart => {

            const existingItem = previousCart.find(
                item => item._id === food._id
            );

            if (existingItem) {
                return previousCart.map(item =>
                    item._id === food._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...previousCart,
                {
                    ...food,
                    quantity: 1
                }
            ];
        });

        setShowCart(true);
    }

    // ======================================
    // INCREASE QUANTITY
    // ======================================

    function increaseQuantity(id) {
        setCart(previousCart =>
            previousCart.map(item =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    }

    // ======================================
    // DECREASE QUANTITY
    // ======================================

    function decreaseQuantity(id) {
        setCart(previousCart =>
            previousCart
                .map(item =>
                    item._id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }

    // ======================================
    // REMOVE ITEM
    // ======================================

    function removeFromCart(id) {
        setCart(previousCart =>
            previousCart.filter(
                item => item._id !== id
            )
        );
    }

    // ======================================
    // PLACE ORDER
    // ======================================

    async function placeOrder({
        address,
        paymentMethod
    }) {

        if (cart.length === 0) {
            throw new Error("Your cart is empty.");
        }

        const orderData = {
            items: cart.map(item => ({
                foodId: item._id,
                quantity: item.quantity
            })),

            address,

            paymentMethod
        };

        const response = await fetch(
            `${API_URL}/orders`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(orderData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Order failed"
            );
        }

        setMessage(
            `Order placed successfully! Total: ₹${result.order.totalAmount}. Order ID: ${result.order._id}`
        );

        setCart([]);

        setShowCheckout(false);

        setShowCart(false);
    }

    // ======================================
    // SEARCH + CATEGORY FILTER
    // ======================================

    const filteredFoods = foods.filter(food => {

        const matchesSearch =
            food.name.toLowerCase().includes(
                search.toLowerCase()
            );

        const matchesCategory =
            category === "all" ||
            food.category === category;

        return matchesSearch && matchesCategory;
    });

    const cartCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // ======================================
    // UI
    // ======================================

    return (
        <div>

            <Navbar
                cartCount={cartCount}
                onCartClick={() => setShowCart(true)}
            />

            <section className="hero" id="home">

                <div className="hero-content">

                    <span className="tag">
                        🍕 Delicious food at your doorstep
                    </span>

                    <h1>
                        Hungry?
                        <br />
                        <span>Order your favourite food.</span>
                    </h1>

                    <p>
                        Discover delicious food and get it
                        delivered to your doorstep.
                    </p>

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search pizza, burger, biryani..."
                            value={search}
                            onChange={event =>
                                setSearch(event.target.value)
                            }
                        />

                    </div>

                </div>

            </section>

            <section className="categories">

                <h2>What's on your mind?</h2>

                <div className="category-container">

                    {[
                        ["all", "🍽️ All"],
                        ["pizza", "🍕 Pizza"],
                        ["burger", "🍔 Burger"],
                        ["biryani", "🍛 Biryani"],
                        ["chinese", "🍜 Chinese"],
                        ["dessert", "🍰 Dessert"]
                    ].map(([value, label]) => (

                        <button
                            key={value}
                            className={
                                category === value
                                    ? "category active"
                                    : "category"
                            }
                            onClick={() => setCategory(value)}
                        >
                            {label}
                        </button>

                    ))}

                </div>

            </section>

            {loading ? (
                <p className="loading">Loading food...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <FoodMenu
                    foods={filteredFoods}
                    onAdd={addToCart}
                />
            )}

            <section className="offers" id="offers">

                <div className="offer-card">

                    <div>
                        <span>🔥 TODAY'S OFFER</span>

                        <h2>Get ₹100 OFF</h2>

                        <p>
                            Use coupon code FOOD100
                        </p>
                    </div>

                    <div className="offer-icon">
                        🛵
                    </div>

                </div>

            </section>

            {showCart && (
                <Cart
                    cart={cart}
                    onClose={() => setShowCart(false)}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeFromCart}
                    onCheckout={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                    }}
                />
            )}

            {showCheckout && (
                <Checkout
                    cart={cart}
                    onClose={() => setShowCheckout(false)}
                    onPlaceOrder={placeOrder}
                />
            )}

            {message && (
                <div className="success-message">

                    <h2>✅ Order Confirmed!</h2>

                    <p>{message}</p>

                    <button
                        onClick={() => setMessage("")}
                    >
                        Continue Shopping
                    </button>

                </div>
            )}

            <footer id="about">

                <h2>🍴 Foodie</h2>

                <p>
                    Delicious food delivered to your doorstep.
                </p>

                <p>© 2026 Foodie. All rights reserved.</p>

            </footer>

        </div>
    );
}

export default App;