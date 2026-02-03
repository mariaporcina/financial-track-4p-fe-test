
import logo from '../../../assets/logo.png';
import { Link } from "@tanstack/react-router";
import Container from '../Container';

import type { ReactNode } from 'react';

type HeaderPropsType = {
  children: ReactNode
}

const Header = ({ children }: HeaderPropsType) => {
  return (
    <Container className='flex items-center justify-between py-12'>
      <Link to="/">
        <picture>
          <img src={logo} alt="Planey Logo" />
        </picture>
      </Link>

      { children }
    </Container>
  )
}

export default Header;
