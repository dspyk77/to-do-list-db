import NavbarTop from '@/components/layout/navbar-top';
import Footer from '@/components/layout/footer';

const Component = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <NavbarTop />
      </header>

      <main className="container">
        {children}
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Component;
