
import logo from '../../../assets/logo.png';
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <>
      <Link to="/transactions">
        <picture>
          <img src={logo} alt="Planey Logo" />
        </picture>
      </Link>
    </>
  )
}

export default Header;
