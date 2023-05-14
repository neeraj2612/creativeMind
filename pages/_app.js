import '../app/globals.css'
import Layout from '@/app/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyApp({ Component, pageProps }) {
    return (
    <Layout>
        <ToastContainer/>
        <Component {...pageProps} />
    </Layout>
    
    );
  }