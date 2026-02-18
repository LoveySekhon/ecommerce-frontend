function Filters({ sort, setSort, category, setCategory, setPage }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        value={sort}
        onChange={(e) => {
          setPage(1);
          setSort(e.target.value);
        }}
        style={{ marginRight: "15px", padding: "5px" }}
      >
        <option value="">Sort By</option>
        <option value="price_asc">Price Low to High</option>
        <option value="price_desc">Price High to Low</option>
      </select>

      <select
        value={category}
        onChange={(e) => {
          setPage(1);
          setCategory(e.target.value);
        }}
        style={{ padding: "5px" }}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Accessories">Accessories</option>
      </select>
    </div>
  );
}

export default Filters;
