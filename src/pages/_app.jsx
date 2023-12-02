import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';import '@/styles/globals.css';
import Layout from '@/components/layout/default-layout';

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
