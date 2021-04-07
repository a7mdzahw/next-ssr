import Navbar from "../components/shared/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar user={pageProps.user || null} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
