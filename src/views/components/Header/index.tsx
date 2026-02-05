
import logo from '../../../assets/logo.png';
import { Link } from "@tanstack/react-router";
import Container from '../Container';

import type { ReactNode } from 'react';

const Header = () => {
  return (
    <>
      <Link to="/">
        <picture>
          <img src={logo} alt="Planey Logo" />
        </picture>
      </Link>
    </>
  )
}

export default Header;
