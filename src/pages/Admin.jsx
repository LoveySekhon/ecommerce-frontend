import { useEffect, useState } from "react";
import api from "../api/axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image_url: ""
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const [editingId, setEditingId] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      // UPDATE PRODUCT
      await api.put(`/products/${editingId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Product updated");
      setEditingId(null);
    } else {
      // ADD PRODUCT
      await api.post("/products", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Product added");
    }

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image_url: ""
    });

    fetchProducts();
  } catch (err) {
    alert("Operation failed");
    console.error(err);
  }
};


  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchProducts();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <h3>Add Product</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        {Object.keys(form).map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <input
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </div>
        ))}
        <button type="submit">
  {editingId ? "Update Product" : "Add Product"}
</button>

      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>All Products</h3>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          {p.name} - ₹{p.price}
          <button
            onClick={() => handleDelete(p.id)}
            style={{ marginLeft: "10px", backgroundColor: "red" }}
          >
            Delete
          </button>
          <button
  onClick={() => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      stock: p.stock,
      image_url: p.image_url
    });
    setEditingId(p.id);
  }}
  style={{ marginLeft: "10px", backgroundColor: "orange" }}
>
  Edit
</button>

        </div>
      ))}
    </div>
  );
}

export default Admin;
