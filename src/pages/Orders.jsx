import { useEffect, useState } from "react";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">

      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            style={{
              border: "1px solid #ddd",
              marginBottom: "20px",
              padding: "15px"
            }}
          >
            <p><strong>Order ID:</strong> {order.order_id}</p>
            <p><strong>Status:</strong> {order.order_status}</p>
            <p><strong>Total:</strong> ₹{order.total_amount}</p>

            <div style={{ marginTop: "10px" }}>
              {order.items.map((item) => (
                <div key={item.product_id}>
                  {item.product_name} × {item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
