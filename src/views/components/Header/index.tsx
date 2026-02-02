
import logo from '../../../assets/logo.png';
import { Link } from "@tanstack/react-router";
import { Button } from '@base-ui/react/button'
import Container from '../Container';

import styles from '../../../index.module.css';

const Header = ({ children }) => {
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
