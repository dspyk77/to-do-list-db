import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';

const matchesCurrentPath = (router, path) => {
  const currentPath = router.asPath;

  return [path, `${path}/`].includes(currentPath);
};

const Component = () => {
  const router = useRouter();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Users', path: '/users' },
  ];

  const navLinks = links.map((link) => {
    return (
      <Link key={link.name} href={link.path} passHref legacyBehavior>
        <Nav.Link active={matchesCurrentPath(router, link.path)}>
          {link.name}
        </Nav.Link>
      </Link>
    );
  });

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
      <Link href="/" passHref legacyBehavior>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="navbar-top" />

      <Navbar.Collapse id="navbar-top">
        <Nav className="me-auto">
          {navLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Component;
