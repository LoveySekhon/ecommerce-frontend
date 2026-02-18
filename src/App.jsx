import { useEffect, useState } from "react";
import api from "./api/axios";
import ProductCard from "./components/ProductCard";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page, sort, category]);

  const fetchProducts = () => {
    api.get(`/products?page=${page}&limit=4&sort=${sort}&category=${category}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 className="text-4xl font-bold text-red-600 mb-6">
  Products
</h1>



      <Filters
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
        setPage={setPage}
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
