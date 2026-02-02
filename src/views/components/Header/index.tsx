
import logo from '../../../assets/logo.png';
import { Link } from "@tanstack/react-router";
import { Button } from '@base-ui/react/button'
import Container from '../Container';

import styles from '../../../index.module.css';

const Header = () => {
  return (
    <Container className='flex items-center justify-between py-12'>
      <Link to="/">
        <picture>
          <img src={logo} alt="Planey Logo" />
        </picture>
      </Link>

      <Button className={`${styles.Button} bg-[#C0E952] text-[#171717] text-sm font-medium`}>Novo valor</Button>
    </Container>
  )
}

export default Header;
