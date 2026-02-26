import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
    

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  backgroundColor: "#1f2937",
  color: "white"
}}>

      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <strong>E-Commerce</strong>
      </Link>

      <div>
        {token ? (
  <>
    <Link to="/cart" style={{ marginRight: "15px", color: "white" }}>
      Cart
    </Link>
    <Link to="/orders" style={{ marginRight: "15px", color: "white" }}>
    Orders
     </Link>
     {role === "admin" && (
  <Link to="/admin" style={{ marginRight: "15px", color: "white" }}>
    Admin
  </Link>
)}


    <button onClick={handleLogout} style={{ cursor: "pointer" }}>
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login" style={{ marginRight: "15px", color: "white" }}>
      Login
    </Link>
    <Link to="/register" style={{ color: "white" }}>
      Register
    </Link>
  </>
)}

      </div>
    </div>
  );
}

export default Navbar;
