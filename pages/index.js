import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1>DEXEF Home Page</h1>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/login",
        fallback: "blocking",
      },
    };
  } else {
    return {
      props: { user: true },
    };
  }
}
