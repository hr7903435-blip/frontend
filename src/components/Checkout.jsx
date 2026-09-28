import React, { useState } from "react";

function Checkout({
    cart,
    onClose,
    onPlaceOrder
}) {
    const [address, setAddress] = useState("");

    const [paymentMethod, setPaymentMethod] =
        useState("Cash");

    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    async function handleSubmit(event) {
        event.preventDefault();

        if (address.trim().length < 5) {
            alert("Please enter a valid address.");
            return;
        }

        setLoading(true);

        try {
            await onPlaceOrder({
                address,
                paymentMethod
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="cart-overlay">

            <div className="cart">

                <div className="cart-header">

                    <h2>Checkout</h2>

                    <button onClick={onClose}>
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <h3>Delivery Address</h3>

                    <textarea
                        value={address}
                        onChange={event =>
                            setAddress(event.target.value)
                        }
                        placeholder="Enter your full address"
                        required
                    />

                    <h3>Payment Method</h3>

                    <select
                        value={paymentMethod}
                        onChange={event =>
                            setPaymentMethod(event.target.value)
                        }
                    >
                        <option value="Cash">
                            Cash on Delivery
                        </option>

                        <option value="UPI">
                            UPI
                        </option>

                        <option value="Card">
                            Card
                        </option>
                    </select>

                    <div className="total">

                        <span>Total</span>

                        <strong>₹{total}</strong>

                    </div>

                    <button
                        className="order-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Placing Order..."
                            : "Place Order"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Checkout;