function ProductCard({ product }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
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
    </div>
  );
}

export default ProductCard;
