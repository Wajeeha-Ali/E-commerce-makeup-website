import { useSelector } from "react-redux";
import Navbar from "./navbar";

function Header() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((s, i) => s + i.quantity, 0)
  );
  return <Navbar cartCount={cartCount} />;
}

export default Header;
