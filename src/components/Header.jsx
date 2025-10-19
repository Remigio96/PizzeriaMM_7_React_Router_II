import Container from "react-bootstrap/Container";
import headerImg from "../assets/header.jpg";

export default function Header() {
  const hero = {
    backgroundImage: `url(${headerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <header className="border-bottom">
      <div style={hero}>
        <div className="bg-dark bg-opacity-50">
          <Container className="text-center text-white py-5">
            <h1 className="display-5 fw-bold">Pizzería Mamma Mia!</h1>
            <p className="lead mb-0">¡Tenemos las mejores pizzas que podrás encontrar!</p>
          </Container>
        </div>
      </div>
    </header>
  );
}
