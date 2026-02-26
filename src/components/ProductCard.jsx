import api from "../api/axios";

function ProductCard({ product }) {

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await api.post(
        "/cart",
        {
          product_id: product.id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Added to cart!");
    } catch (err) {
      alert("Error adding to cart");
      console.error(err);
    }
  };

  return (
    <div style={{
  background: "white",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
}}>

      <img
        src={product.image_url}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>₹{product.price}</strong></p>
      <p style={{ color: "gray" }}>{product.category}</p>

      <button 
        onClick={handleAddToCart}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
