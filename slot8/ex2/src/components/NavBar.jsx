import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: "#282c34",
        padding: "15px 30px",
        display: "flex",
        gap: "25px",
        borderBottom: "1px solid #3e4451",
      }}
    >
      {["Exercise 1", "Exercise 2", "Exercise 3", "Exercise 4"].map(
        (text, index) => (
          <Link
            key={index}
            to={`/ex${index + 1}`}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {text}
          </Link>
        )
      )}
    </nav>
  );
}
