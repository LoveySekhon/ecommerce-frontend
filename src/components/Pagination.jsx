function Pagination({ page, totalPages, setPage }) {
  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        style={{ marginRight: "10px", padding: "8px 15px" }}
      >
        Previous
      </button>

      <span> Page {page} of {totalPages} </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        style={{ marginLeft: "10px", padding: "8px 15px" }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
