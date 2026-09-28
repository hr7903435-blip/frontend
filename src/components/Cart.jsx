import React from "react";

function Cart({
    cart,
    onClose,
    onIncrease,
    onDecrease,
    onRemove,
    onCheckout
}) {
    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const count = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <div className="cart-overlay">

            <div className="cart">

                <div className="cart-header">

                    <h2>🛒 Your Cart ({count})</h2>

                    <button onClick={onClose}>
                        ×
                    </button>

                </div>

                {cart.length === 0 ? (
                    <p className="empty-cart">
                        Your cart is empty.
                    </p>
                ) : (
                    cart.map(item => (
                        <div
                            className="cart-item"
                            key={item._id}
                        >

                            <div className="cart-info">

                                <strong>{item.name}</strong>

                                <small>
                                    ₹{item.price} each
                                </small>

                            </div>

                            <div className="quantity">

                                <button
                                    onClick={() =>
                                        onDecrease(item._id)
                                    }
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        onIncrease(item._id)
                                    }
                                >
                                    +
                                </button>

                            </div>

                            <button
                                className="remove"
                                onClick={() =>
                                    onRemove(item._id)
                                }
                            >
                                🗑️
                            </button>

                        </div>
                    ))
                )}

                <div className="total">

                    <span>Total</span>

                    <strong>₹{total}</strong>

                </div>

                <button
                    className="order-button"
                    onClick={onCheckout}
                    disabled={cart.length === 0}
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>
    );
}

export default Cart;