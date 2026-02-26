import { useEffect, useState } from "react";
import api from "../api/axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId) => {
  const token = localStorage.getItem("token");

  try {
    await api.delete("/cart", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        product_id: productId
      }
    });

    fetchCart();
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
  const token = localStorage.getItem("token");

  try {
    await api.post("/orders", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Order placed successfully!");
    fetchCart();
  } catch (err) {
    alert("Checkout failed");
    console.error(err);
  }
};

  return (
    <div className="container">

      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              style={{
                borderBottom: "1px solid #ddd",
                marginBottom: "10px",
                paddingBottom: "10px"
              }}
            >
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>

              <button
                onClick={() => handleRemove(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
          <button
  onClick={handleCheckout}
  style={{
    marginTop: "15px",
    padding: "8px 15px",
    cursor: "pointer"
  }}
>
  Place Order
</button>

        </>
      )}
    </div>
  );
}

export default Cart;
