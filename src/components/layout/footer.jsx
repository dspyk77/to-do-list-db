import Container from 'react-bootstrap/Container';

const Component = ({ className }) => {
  return (
    <footer className={className}>
      <Container
        className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top"
      >
        <span className="mb-3 mb-md-0 text-light">Footer</span>
      </Container>
    </footer>
  );
};

export default Component;
